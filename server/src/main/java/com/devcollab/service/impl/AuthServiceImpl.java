package com.devcollab.service.impl;

import com.devcollab.dto.request.LoginRequest;
import com.devcollab.dto.request.OAuth2RegisterRequest;
import com.devcollab.dto.request.RegisterRequest;
import com.devcollab.dto.response.AuthResponse;
import com.devcollab.exception.ResourceAlreadyExistsException;
import com.devcollab.exception.ResourceNotFoundException;
import com.devcollab.exception.UnauthorizedException;
import com.devcollab.model.RefreshToken;
import com.devcollab.model.User;
import com.devcollab.repository.RefreshTokenRepository;
import com.devcollab.repository.UserRepository;
import com.devcollab.security.JwtTokenProvider;
import com.devcollab.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

/**
 * Implementation of AuthService
 */
@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final RestTemplate restTemplate = new RestTemplate();
    
    @Value("${github.client.id:}")
    private String githubClientId;
    
    @Value("${github.client.secret:}")
    private String githubClientSecret;

    @Override
    public AuthResponse register(RegisterRequest request) {
        log.info("Registering new user with email: {}", request.getEmail());

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new ResourceAlreadyExistsException("User with email " + request.getEmail() + " already exists");
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setFullName(request.getFullName());
        user.setBio(request.getBio());
        user.setGithubUsername(request.getGithubUsername());
        user.setLinkedinUrl(request.getLinkedinUrl());
        user.setExperienceLevel(request.getExperienceLevel());
        user.setTimezone(request.getTimezone());
        user.setHoursPerWeek(request.getHoursPerWeek());
        user.setProvider("local");
        if (request.getInterests() != null) {
            user.setInterests(request.getInterests());
        }

        User savedUser = userRepository.save(user);

        String accessToken = jwtTokenProvider.generateToken(savedUser.getEmail());
        String refreshToken = createRefreshToken(savedUser);

        log.info("User registered successfully with ID: {}", savedUser.getId());
        return new AuthResponse(accessToken, refreshToken, savedUser.getId(), savedUser.getEmail(), savedUser.getFullName());
    }

    @Override
    public AuthResponse registerWithOAuth(OAuth2RegisterRequest request) {
        log.info("OAuth registration/login via provider: {}", request.getProvider());
        
        // Handle missing email for GitHub users without public email
        String email = request.getEmail();
        String fullName = request.getFullName();
        String username = request.getUsername();
        
        // Validate that we have at least email or username
        if ((email == null || email.isEmpty()) && (username == null || username.isEmpty())) {
            throw new UnauthorizedException("Either email or username is required for OAuth registration");
        }
        
        // Generate placeholder email if email is missing (GitHub users without public email)
        if (email == null || email.isEmpty()) {
            email = username + "@github.user";
            log.info("Generated placeholder email for GitHub user without public email: {}", email);
        }
        
        // Use username as fullName if fullName is missing
        if (fullName == null || fullName.isEmpty()) {
            fullName = username != null ? username : email.split("@")[0];
        }

        // Check if user already exists by providerId first (more reliable for OAuth)
        User user = userRepository.findByProviderAndProviderId(request.getProvider(), request.getProviderId())
                .orElse(null);
        
        // If not found by providerId, try by email (but only if email is not a placeholder)
        if (user == null && !email.endsWith("@github.user")) {
            user = userRepository.findByEmail(email).orElse(null);
        }

        if (user != null) {
            // User exists - update their information if needed
            boolean updated = false;
            
            if (user.getProvider() == null || user.getProviderId() == null) {
                user.setProvider(request.getProvider());
                user.setProviderId(request.getProviderId());
                updated = true;
            }
            
            // Update email if it was a placeholder and we now have a real one
            if (user.getEmail() != null && user.getEmail().endsWith("@github.user") && 
                !email.endsWith("@github.user")) {
                user.setEmail(email);
                updated = true;
            }
            
            // Update profile picture if provided
            if (request.getProfilePicture() != null && !request.getProfilePicture().isEmpty()) {
                user.setProfilePicture(request.getProfilePicture());
                updated = true;
            }
            
            // Update GitHub username if provided
            if (request.getGithubUsername() != null && !request.getGithubUsername().isEmpty()) {
                user.setGithubUsername(request.getGithubUsername());
                updated = true;
            }
            
            if (updated) {
                user = userRepository.save(user);
            }
            
            log.info("Existing OAuth user logged in with ID: {}", user.getId());
        } else {
            // Create new user
            user = new User();
            user.setEmail(email);
            user.setFullName(fullName);
            user.setProvider(request.getProvider());
            user.setProviderId(request.getProviderId());
            user.setProfilePicture(request.getProfilePicture());
            user.setExperienceLevel(User.ExperienceLevel.BEGINNER); // Default
            
            // Set GitHub username
            if (request.getGithubUsername() != null && !request.getGithubUsername().isEmpty()) {
                user.setGithubUsername(request.getGithubUsername());
            } else if (username != null && !username.isEmpty()) {
                user.setGithubUsername(username);
            }

            user = userRepository.save(user);
            log.info("New OAuth user created with ID: {} with email: {}", user.getId(), email);
        }

        // Generate tokens using email as identifier
        String accessToken = jwtTokenProvider.generateToken(user.getEmail());
        String refreshToken = createRefreshToken(user);

        return new AuthResponse(accessToken, refreshToken, user.getId(), user.getEmail(), user.getFullName());
    }

    @Override
    public AuthResponse login(LoginRequest request) {
        log.info("User login attempt for email: {}", request.getEmail());

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + request.getEmail()));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new UnauthorizedException("Invalid credentials");
        }

        if (!user.getActive()) {
            throw new UnauthorizedException("User account is deactivated");
        }

        String accessToken = jwtTokenProvider.generateToken(user.getEmail());
        String refreshToken = createRefreshToken(user);

        log.info("User logged in successfully with ID: {}", user.getId());
        return new AuthResponse(accessToken, refreshToken, user.getId(), user.getEmail(), user.getFullName());
    }

    @Override
    public AuthResponse refreshToken(String refreshToken) {
        log.info("Refreshing access token");

        RefreshToken token = refreshTokenRepository.findByToken(refreshToken)
                .orElseThrow(() -> new UnauthorizedException("Invalid refresh token"));

        if (token.getExpiryDate().isBefore(Instant.now())) {
            refreshTokenRepository.delete(token);
            throw new UnauthorizedException("Refresh token expired");
        }

        User user = token.getUser();
        String newAccessToken = jwtTokenProvider.generateToken(user.getEmail());

        return new AuthResponse(newAccessToken, refreshToken, user.getId(), user.getEmail(), user.getFullName());
    }

    @Override
    public void logout(Long userId) {
        log.info("Logging out user with ID: {}", userId);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));

        refreshTokenRepository.deleteByUser(user);
        log.info("User logged out successfully");
    }

    @Override
    public String exchangeGitHubCode(String code) {
        log.info("Exchanging GitHub code for access token");
        
        if (githubClientId == null || githubClientId.isEmpty() || 
            githubClientSecret == null || githubClientSecret.isEmpty()) {
            throw new UnauthorizedException("GitHub OAuth is not configured on the server");
        }
        
        try {
            // Exchange code for access token
            String tokenUrl = "https://github.com/login/oauth/access_token";
            
            Map<String, String> requestBody = new HashMap<>();
            requestBody.put("client_id", githubClientId);
            requestBody.put("client_secret", githubClientSecret);
            requestBody.put("code", code);
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("Accept", "application/json");
            
            HttpEntity<Map<String, String>> request = new HttpEntity<>(requestBody, headers);
            
            ResponseEntity<Map> response = restTemplate.exchange(
                tokenUrl,
                HttpMethod.POST,
                request,
                Map.class
            );
            
            if (response.getBody() != null && response.getBody().containsKey("access_token")) {
                String accessToken = (String) response.getBody().get("access_token");
                log.info("Successfully exchanged GitHub code for access token");
                return accessToken;
            } else {
                log.error("GitHub token exchange failed: {}", response.getBody());
                throw new UnauthorizedException("Failed to exchange GitHub code for access token");
            }
        } catch (Exception e) {
            log.error("Error exchanging GitHub code", e);
            throw new UnauthorizedException("Failed to authenticate with GitHub: " + e.getMessage());
        }
    }
    
    private String createRefreshToken(User user) {
        // Delete existing refresh token if any
        refreshTokenRepository.findByUser(user).ifPresent(refreshTokenRepository::delete);

        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setUser(user);
        refreshToken.setToken(UUID.randomUUID().toString());
        refreshToken.setCreatedAt(Instant.now());
        refreshToken.setExpiryDate(Instant.now().plusSeconds(7 * 24 * 60 * 60)); // 7 days

        refreshTokenRepository.save(refreshToken);
        return refreshToken.getToken();
    }
}

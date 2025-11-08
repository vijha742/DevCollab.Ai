package com.devcollab.controller;

import com.devcollab.dto.request.LoginRequest;
import com.devcollab.dto.request.OAuth2RegisterRequest;
import com.devcollab.dto.request.RegisterRequest;
import com.devcollab.dto.response.ApiResponse;
import com.devcollab.dto.response.AuthResponse;
import com.devcollab.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Controller for authentication endpoints
 */
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponse>> register(@Valid @RequestBody RegisterRequest request) {
        log.info("Registration request received for email: {}", request.getEmail());
        AuthResponse response = authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("User registered successfully", response));
    }

    @GetMapping("/test")
    public ResponseEntity<String> testEndpoint() {
        log.info("Test endpoint accessed");
        return ResponseEntity.ok("AuthController is working!");
    }

    @PostMapping("/oauth/register")
    public ResponseEntity<ApiResponse<AuthResponse>> registerWithOAuth(@Valid @RequestBody OAuth2RegisterRequest request) {
        log.info("OAuth registration request received for email: {} from provider: {}", request.getEmail(), request.getProvider());
        AuthResponse response = authService.registerWithOAuth(request);
        return ResponseEntity.ok(ApiResponse.success("OAuth authentication successful", response));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody LoginRequest request) {
        log.info("Login request received for email: {}", request.getEmail());
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(ApiResponse.success("Login successful", response));
    }

    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<AuthResponse>> refreshToken(@RequestParam String refreshToken) {
        log.info("Token refresh request received");
        AuthResponse response = authService.refreshToken(refreshToken);
        return ResponseEntity.ok(ApiResponse.success("Token refreshed successfully", response));
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logout(@RequestParam Long userId) {
        log.info("Logout request received for user ID: {}", userId);
        authService.logout(userId);
        return ResponseEntity.ok(ApiResponse.success("Logout successful", null));
    }
    
    /**
     * Exchange GitHub OAuth code for access token
     * This is called by the frontend after GitHub redirects back with the code
     */
    @PostMapping("/github/exchange")
    public ResponseEntity<ApiResponse<String>> exchangeGitHubCode(@RequestBody GitHubCodeRequest request) {
        log.info("GitHub code exchange request received");
        String accessToken = authService.exchangeGitHubCode(request.getCode());
        return ResponseEntity.ok(ApiResponse.success("GitHub token retrieved", accessToken));
    }
    
    /**
     * Request DTO for GitHub code exchange
     */
    public static class GitHubCodeRequest {
        private String code;
        
        public String getCode() {
            return code;
        }
        
        public void setCode(String code) {
            this.code = code;
        }
    }
}

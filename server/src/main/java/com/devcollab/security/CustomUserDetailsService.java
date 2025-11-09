package com.devcollab.security;

import com.devcollab.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

/**
 * Custom UserDetailsService implementation for Spring Security
 */
@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        com.devcollab.model.User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        // For OAuth users, use providerId as password. For regular users, use their actual password.
        String password = user.getPassword();
        if (password == null && user.getProviderId() != null) {
            // Extract the provider part from providerId (e.g., "google-oauth2" from "google-oauth2|117579955764407811576")
            String[] parts = user.getProviderId().split("\\|");
            password = parts.length > 0 ? parts[0] : "oauth-user-" + user.getId();
        }

        return User.builder()
                .username(user.getEmail())
                .password(password != null ? password : "no-password")
                .authorities(new ArrayList<>())
                .accountExpired(false)
                .accountLocked(!user.getActive())
                .credentialsExpired(false)
                .disabled(!user.getActive())
                .build();
    }
}

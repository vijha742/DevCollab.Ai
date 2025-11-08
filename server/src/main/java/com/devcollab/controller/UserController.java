package com.devcollab.controller;

import com.devcollab.dto.request.UpdateUserRequest;
import com.devcollab.dto.response.ApiResponse;
import com.devcollab.dto.response.UserResponse;
import com.devcollab.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller for user management endpoints
 */
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Slf4j
public class UserController {

    private final UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<UserResponse>> getUserById(@PathVariable Long id) {
        log.info("Get user request for ID: {}", id);
        UserResponse user = userService.getUserById(id);
        return ResponseEntity.ok(ApiResponse.success(user));
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<ApiResponse<UserResponse>> getUserByEmail(@PathVariable String email) {
        log.info("Get user request for email: {}", email);
        UserResponse user = userService.getUserByEmail(email);
        return ResponseEntity.ok(ApiResponse.success(user));
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserResponse>> getCurrentUser(Authentication authentication) {
        log.info("Get current user request");
        String email = authentication.getName();
        UserResponse user = userService.getUserByEmail(email);
        return ResponseEntity.ok(ApiResponse.success(user));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<UserResponse>> updateUser(
            @PathVariable Long id,
            @RequestBody UpdateUserRequest request) {
        log.info("Update user request for ID: {}", id);
        UserResponse user = userService.updateUser(id, request);
        return ResponseEntity.ok(ApiResponse.success("User updated successfully", user));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteUser(@PathVariable Long id) {
        log.info("Delete user request for ID: {}", id);
        userService.deleteUser(id);
        return ResponseEntity.ok(ApiResponse.success("User deleted successfully", null));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<UserResponse>>> getAllActiveUsers() {
        log.info("Get all active users request");
        List<UserResponse> users = userService.getAllActiveUsers();
        return ResponseEntity.ok(ApiResponse.success(users));
    }

    @PostMapping("/{id}/sync-github")
    public ResponseEntity<ApiResponse<UserResponse>> syncGitHubSkills(@PathVariable Long id) {
        log.info("Sync GitHub skills request for user ID: {}", id);
        UserResponse user = userService.syncGitHubSkills(id);
        return ResponseEntity.ok(ApiResponse.success("GitHub skills synced successfully", user));
    }

    @PostMapping("/{id}/enrich-profile")
    public ResponseEntity<ApiResponse<UserResponse>> enrichProfile(@PathVariable Long id) {
        log.info("Enrich profile request for user ID: {}", id);
        UserResponse user = userService.enrichProfileWithAI(id);
        return ResponseEntity.ok(ApiResponse.success("Profile enriched successfully", user));
    }
}

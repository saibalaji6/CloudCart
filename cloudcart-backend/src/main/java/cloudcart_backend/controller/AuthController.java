package cloudcart_backend.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.*;

import cloudcart_backend.dto.AuthResponse;
import cloudcart_backend.dto.LoginRequest;
import cloudcart_backend.dto.RegisterRequest;
import cloudcart_backend.service.AuthService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public AuthResponse register(@RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }

    @PostMapping("/forgot-password")
    public String forgotPassword(@RequestBody Map<String, String> request) {
        authService.forgotPassword(request.get("email"));
        return "Password reset email sent successfully";
    }

    @PostMapping("/reset-password")
    public String resetPassword(@RequestBody Map<String, String> request) {
        authService.resetPassword(
                request.get("token"),
                request.get("newPassword")
        );

        return "Password reset successfully";
    }
}
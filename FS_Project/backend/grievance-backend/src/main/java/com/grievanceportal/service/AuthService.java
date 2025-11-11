package com.grievanceportal.service;

import com.grievanceportal.dto.*;
import com.grievanceportal.model.User;
import com.grievanceportal.repository.UserRepository;
import com.grievanceportal.security.JwtService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AuthService(UserRepository userRepository, JwtService jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    public AuthResponse signup(SignupRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return AuthResponse.builder()
                    .message("User already exists")
                    .token(null)
                    .build();
        }

        // ✅ Default all signups as normal users
        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .role("USER") // 🟢 assign default user role
                .build();

        userRepository.save(user);

        // 🧠 Include role inside JWT (for admin restrictions)
        String token = jwtService.generateTokenWithRole(user.getEmail(), user.getRole());

        return AuthResponse.builder()
                .message("Signup successful")
                .token(token)
                .build();
    }

    public AuthResponse login(LoginRequest request) {
        var userOpt = userRepository.findByEmail(request.getEmail());

        if (userOpt.isEmpty()) {
            return AuthResponse.builder()
                    .message("Invalid credentials")
                    .token(null)
                    .build();
        }

        User user = userOpt.get();
        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            return AuthResponse.builder()
                    .message("Invalid credentials")
                    .token(null)
                    .build();
        }

        // 🧠 Generate token with role
        String token = jwtService.generateTokenWithRole(user.getEmail(), user.getRole());

        return AuthResponse.builder()
                .message("Login successful")
                .token(token)
                .build();
    }
}

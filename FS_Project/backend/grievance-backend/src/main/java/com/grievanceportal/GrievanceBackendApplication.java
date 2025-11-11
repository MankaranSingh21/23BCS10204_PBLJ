package com.grievanceportal;

import com.grievanceportal.model.User;
import com.grievanceportal.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication(scanBasePackages = "com.grievanceportal")
public class GrievanceBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(GrievanceBackendApplication.class, args);
    }

    @Bean
    CommandLineRunner init(UserRepository userRepository) {
        return args -> {
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

            if (userRepository.findByEmail("admin@portal.com").isEmpty()) {
                User admin = User.builder()
                        .name("System Admin")
                        .email("admin@portal.com")
                        .passwordHash(encoder.encode("admin123"))
                        .role("ADMIN")
                        .build();
                userRepository.save(admin);
                System.out.println("✅ Admin user created: admin@portal.com / admin123");
            }

            if (userRepository.findByEmail("moon@example.com").isEmpty()) {
                User user = User.builder()
                        .name("Moon")
                        .email("moon@example.com")
                        .passwordHash(encoder.encode("moon123"))
                        .role("USER")
                        .build();
                userRepository.save(user);
                System.out.println("✅ User created: moon@example.com / moon123");
            }
        };
    }
}

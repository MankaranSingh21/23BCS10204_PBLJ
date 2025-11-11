package com.grievanceportal.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users") // ✅ Renamed to avoid SQL reserved keyword conflict
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String passwordHash;

    @Column(nullable = false)
    private String role; // "USER" or "ADMIN"
}

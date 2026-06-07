package com.example.demo.dto;

import com.example.demo.model.User;
import java.time.LocalDateTime;

public record UserResponse(
    Long id,
    String name,
    String email,
    int age,
    LocalDateTime createdAt
) {
    public static UserResponse fromEntity(User user) {
        return new UserResponse(
            user.getId(),
            user.getName(),
            user.getEmail(),
            user.getAge(),
            user.getCreatedAt()
        );
    }
}
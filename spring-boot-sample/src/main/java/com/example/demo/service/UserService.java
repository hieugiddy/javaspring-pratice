package com.example.demo.service;

import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.UserRequest;
import com.example.demo.dto.UserResponse;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class UserService {
    private static final Logger log = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<UserResponse> findAll() {
        log.debug("Fetching all users");
        return userRepository.findAll().stream()
            .map(UserResponse::fromEntity)
            .toList();
    }

    public UserResponse findById(Long id) {
        log.info("Finding user by id: {}", id);
        return userRepository.findById(id)
            .map(UserResponse::fromEntity)
            .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
    }

    @Transactional
    public UserResponse create(UserRequest request) {
        log.info("Creating user: {}", request.email());
        if (userRepository.existsByEmail(request.email())) {
            throw new IllegalArgumentException("Email already exists: " + request.email());
        }
        User user = new User(
            request.name(),
            request.email(),
            passwordEncoder.encode(request.password()),
            request.age()
        );
        user = userRepository.save(user);
        log.debug("User created with id: {}", user.getId());
        return UserResponse.fromEntity(user);
    }

    @Transactional
    public UserResponse update(Long id, UserRequest request) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        user.setName(request.name());
        user.setEmail(request.email());
        if (!request.password().isBlank()) {
            user.setPassword(passwordEncoder.encode(request.password()));
        }
        user.setAge(request.age());
        user = userRepository.save(user);
        return UserResponse.fromEntity(user);
    }

    @Transactional
    public void delete(Long id) {
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("User not found with id: " + id);
        }
        userRepository.deleteById(id);
        log.info("Deleted user id: {}", id);
    }

    public User authenticate(LoginRequest request) {
        User user = userRepository.findByEmail(request.email())
            .orElseThrow(() -> new ResourceNotFoundException("Invalid credentials"));
        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid credentials");
        }
        return user;
    }
}
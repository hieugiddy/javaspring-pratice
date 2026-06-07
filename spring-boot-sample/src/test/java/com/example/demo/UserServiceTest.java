package com.example.demo;

import com.example.demo.dto.UserRequest;
import com.example.demo.dto.UserResponse;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    private User user;
    private UserRequest request;

    @BeforeEach
    void setUp() {
        user = new User("Alice", "alice@email.com", "encoded-pass", 22);
        user.setId(1L);
        request = new UserRequest("Alice", "alice@email.com", "password", 22);
    }

    @Test
    @DisplayName("Should create user successfully")
    void shouldCreateUser() {
        when(passwordEncoder.encode(any())).thenReturn("encoded-pass");
        when(userRepository.existsByEmail(any())).thenReturn(false);
        when(userRepository.save(any())).thenReturn(user);

        UserResponse result = userService.create(request);

        assertThat(result.name()).isEqualTo("Alice");
        assertThat(result.email()).isEqualTo("alice@email.com");
        verify(userRepository).save(any());
    }

    @Test
    @DisplayName("Should throw when email exists")
    void shouldThrowWhenEmailExists() {
        when(userRepository.existsByEmail(request.email())).thenReturn(true);

        assertThatThrownBy(() -> userService.create(request))
            .isInstanceOf(IllegalArgumentException.class)
            .hasMessageContaining("Email already exists");

        verify(userRepository, never()).save(any());
    }

    @Test
    @DisplayName("Should find user by id")
    void shouldFindById() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        UserResponse result = userService.findById(1L);

        assertThat(result.id()).isEqualTo(1L);
        assertThat(result.name()).isEqualTo("Alice");
    }

    @Test
    @DisplayName("Should throw when user not found")
    void shouldThrowWhenNotFound() {
        when(userRepository.findById(999L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> userService.findById(999L))
            .isInstanceOf(ResourceNotFoundException.class)
            .hasMessageContaining("not found");
    }
}
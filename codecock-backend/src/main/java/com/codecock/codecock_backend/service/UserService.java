package com.codecock.codecock_backend.service;

import com.codecock.codecock_backend.dto.users.UserDTO;
import com.codecock.codecock_backend.entity.User;
import com.codecock.codecock_backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.codecock.codecock_backend.service.security.InvalidCredentialsException;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;


    @Transactional
    public UserDTO createUser(UserDTO userDTO) {
        User user = userDTO.toEntity();  // UserDTO를 User 엔티티로 변환
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        userRepository.save(user);  // User 엔티티 저장
        return UserDTO.fromEntity(user);  // 저장된 엔티티를 다시 DTO로 변환하여 반환
    }

    @Transactional(readOnly = true)
    public UserDTO checkUserById(String username) {
        Optional<User> user = userRepository.findByUsername(username);
        return user.map(UserDTO::fromEntity).orElse(null);
    }

    @Transactional
    public UserDTO registerUser(UserDTO userDTO) {
        // 중복 검사
        if (userRepository.findByUsername(userDTO.getUsername()).isPresent()) {
            throw new IllegalArgumentException("이미 존재하는 username입니다.");
        }
        if (userDTO.getStudentId() != null && userRepository.findByStudentId(userDTO.getStudentId()).isPresent()) {
            throw new IllegalArgumentException("이미 존재하는 studentId입니다.");
        }
        if (userRepository.findByEmail(userDTO.getEmail()).isPresent()) {
            throw new IllegalArgumentException("이미 존재하는 email입니다.");
        }

        // 회원 저장
        User user = User.builder()
                .username(userDTO.getUsername())
                .name(userDTO.getName())
                .password(userDTO.getPassword()) // 비밀번호는 반드시 암호화 필요
                .studentId(userDTO.getStudentId())
                .email(userDTO.getEmail())
                .phone(userDTO.getPhone())
                .userStatus(userDTO.getUserStatus())
                .build();

        userRepository.save(user);

        return UserDTO.fromEntity(user);
    }


    @Transactional
    public UserDTO updateUser(Integer userId, UserDTO userDTO) {
        Optional<User> existingUser = userRepository.findById(userId);
        if (existingUser.isPresent()) {
            User user = existingUser.get();
            user.setPassword(user.getPassword());
            user.setEmail(userDTO.getEmail());
            user.setPhone(userDTO.getPhone());
            user.setUserStatus(userDTO.getUserStatus());
            user.setUpdatedAt(LocalDateTime.now());
            User updatedUser = userRepository.save(user);
            return UserDTO.fromEntity(updatedUser);
        }
        return null;
    }

    @Transactional
    public boolean deleteUser(Integer userId) {
        if (userRepository.existsById(userId)) {
            userRepository.deleteById(userId);
            return true;
        }
        return false;
    }

    @Transactional(readOnly = true)
    public UserDTO getUserProfile(Integer userId) {
        Optional<User> user = userRepository.findById(userId);
        return user.map(UserDTO::fromEntity).orElse(null);
    }

    @Transactional
    public UserDTO updateUserRole(Integer userId, String role) {
        Optional<User> userOptional = userRepository.findById(userId);
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                user.setUserStatus(role.equalsIgnoreCase("mentor") ? 1 : 2); // 1: 멘토, 2: 멘티
                user.setUpdatedAt(LocalDateTime.now());
                userRepository.save(user);
                return UserDTO.fromEntity(user);
            } 
            else {
                throw new RuntimeException("해당 사용자를 찾을 수 없습니다.");
            }
    }
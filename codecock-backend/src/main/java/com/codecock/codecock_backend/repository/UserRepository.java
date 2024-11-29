package com.codecock.codecock_backend.repository;

import com.codecock.codecock_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByUsername(String username);
    Optional<User> findByUserId(Integer userId);  // user_num으로 조회하는 메서드 추가
    Optional<User> findByStudentId(String studentId);
    Optional<User> findByEmail(String email);
}
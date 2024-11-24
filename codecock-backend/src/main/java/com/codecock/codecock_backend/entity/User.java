package com.codecock.codecock_backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id") // PK (AUTO_INCREMENT)
    private Integer userId;

    @Column(name = "username", nullable = false, unique = true, length = 50) // 사용자 아이디
    private String username;

    @Column(name = "name", nullable = false, length = 50) // 사용자 이름
    private String name;

    @Setter
    @Column(name = "password", nullable = false, length = 255) // 비밀번호
    private String password;

    @Setter
    @Column(name = "student_id", length = 20) // 학번
    private String studentId;

    @Setter
    @Column(name = "email", nullable = false, unique = true, length = 100) // 이메일
    private String email;

    @Setter
    @Column(name = "phone", length = 15) // 전화번호
    private String phone;

    @Setter
    @Column(name = "user_status", nullable = false) // 사용자 상태 (0: 관리자, 1: 멘토, 2: 멘티)
    private Integer userStatus;

    @CreatedDate
    @Column(name = "created_at", updatable = false) // 생성일자
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at") // 수정일자
    private LocalDateTime updatedAt;

    @Builder
    public User(Integer userId, String username, String name, String password, String studentId,
                String email, String phone, Integer userStatus, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.userId = userId;
        this.username = username;
        this.name = name;
        this.password = password;
        this.studentId = studentId;
        this.email = email;
        this.phone = phone;
        this.userStatus = (userStatus == null) ? 0 : userStatus;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

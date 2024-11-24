package com.codecock.codecock_backend.dto.users;

import com.codecock.codecock_backend.entity.User;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor // 모든 필드를 초기화하는 생성자 추가
public class UserDTO {
    private Integer userId; // userId로 변경 (PK)

    @JsonProperty("username") // 사용자 아이디
    private String username;

    @JsonProperty("name") // 사용자 이름
    private String name;

    @JsonProperty("password") // 비밀번호
    private String password;

    @JsonProperty("studentId") // 학번
    private String studentId;

    @JsonProperty("email") // 이메일
    private String email;

    @JsonProperty("phone") // 전화번호
    private String phone;

    @JsonProperty("userStatus") // 사용자 상태
    private Integer userStatus;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    /**
     * 엔티티를 DTO로 변환하는 메서드
     */
    public static UserDTO fromEntity(User user) {
        return UserDTO.builder()
                .userId(user.getUserId())
                .username(user.getUsername())
                .name(user.getName())
                .password(user.getPassword())
                .studentId(user.getStudentId())
                .email(user.getEmail())
                .phone(user.getPhone())
                .userStatus(user.getUserStatus())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }

    /**
     * DTO를 엔티티로 변환하는 메서드
     */
    public User toEntity() {
        return User.builder()
                .userId(this.userId)
                .username(this.username)
                .name(this.name)
                .password(this.password)
                .studentId(this.studentId)
                .email(this.email)
                .phone(this.phone)
                .userStatus(this.userStatus)
                .createdAt(this.createdAt)
                .updatedAt(this.updatedAt)
                .build();
    }
}

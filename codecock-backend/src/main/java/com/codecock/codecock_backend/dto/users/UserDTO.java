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
    private Integer userNum;

    @JsonProperty("userId")
    private String userId;

    @JsonProperty("userPw")
    private String password;

    @JsonProperty("userName")
    private String userName;

    @JsonProperty("userEmail")
    private String userEmail;

    private Integer userState;
    private Integer myStore;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static UserDTO fromEntity(User user) {
        return UserDTO.builder()
                .userNum(user.getUserNum())
                .userId(user.getUserId())
                .password(user.getPassword())
                .userName(user.getUserName())
                .userEmail(user.getUserEmail())
                .userState(user.getUserState())
                .myStore(user.getMyStore())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }

    public User toEntity() {
        return User.builder()
                .userNum(this.userNum)
                .userId(this.userId)
                .password(this.password)
                .userName(this.userName)
                .userEmail(this.userEmail)
                .userState(this.userState)
                .myStore(this.myStore)
                .createdAt(this.createdAt)
                .updatedAt(this.updatedAt)
                .build();
    }
}

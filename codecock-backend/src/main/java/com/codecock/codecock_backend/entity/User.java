package com.codecock.codecock_backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_num")
    private Integer userNum;

    @Column(name = "user_id", nullable = false, length = 100)
    private String userId;

    @Setter
    @Column(name = "user_pw", nullable = false)
    private String password;

    @Setter
    @Column(name = "user_name", nullable = false, length = 50)
    private String userName;

    @Setter
    @Column(name = "user_email", length = 100)
    private String userEmail;

    @Setter
    @Column(name = "user_state")
    private Integer userState;

    @Setter
    @Column(name = "my_store")
    private Integer myStore;

    @Column(name = "created_at", insertable = false)
    @CreatedDate
    private LocalDateTime createdAt;

    @Column(name = "updated_at", insertable = false)
    @LastModifiedDate
    private LocalDateTime updatedAt;

    @Builder
    public User(Integer userNum, String userId, String password, String userName, String userEmail, Integer userState, Integer myStore ,LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.userNum = userNum;
        this.userId = userId;
        this.password = password;
        this.userName = userName;
        this.userEmail = userEmail;
        this.userState = (userState == null) ? 0 : userState;
        this.myStore = (myStore == null) ? 0 : myStore;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

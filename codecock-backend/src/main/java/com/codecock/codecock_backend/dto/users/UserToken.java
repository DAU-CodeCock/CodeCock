package com.codecock.codecock_backend.dto.users;

import lombok.Data;

@Data
public class UserToken {
    private Integer userId;
    private String username;
    private Integer userStatus;
}

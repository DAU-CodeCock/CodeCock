package com.codecock.codecock_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BoardsDTO {
    private Integer boardId;
    private Integer userId;
    private String title;
    private String content;
    private String filePath;
    private LocalDateTime createdAt;
}
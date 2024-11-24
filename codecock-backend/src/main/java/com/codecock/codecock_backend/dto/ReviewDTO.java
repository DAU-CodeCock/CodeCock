package com.codecock.codecock_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewDTO {
    private Integer commentId;        // 댓글 ID
    private Integer boardId;          // 게시판 ID
    private Integer userId;           // 작성자 ID
    private String username;          // 작성자 이름 (선택적 표시용)
    private String content;           // 댓글 내용
    private LocalDateTime createdAt;  // 생성일자
    private LocalDateTime updatedAt;  // 수정일자
}

package com.codecock.codecock_backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "boards")
public class Boards {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_id") // 게시판 식별자 (PK)
    private Integer boardId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false) // 외래 키 (유저 테이블)
    private User user;

    @Column(name = "title", nullable = false, length = 255) // 제목
    private String title;

    @Column(name = "content", nullable = false, columnDefinition = "TEXT") // 내용
    private String content;

    @Column(name = "file_path", length = 255) // 파일 경로
    private String filePath;

    @Column(name = "created_at", updatable = false) // 생성일자
    private LocalDateTime createdAt;

    @Column(name = "updated_at") // 수정일자
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}

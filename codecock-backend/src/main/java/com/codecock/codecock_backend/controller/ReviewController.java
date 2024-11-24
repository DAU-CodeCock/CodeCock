package com.codecock.codecock_backend.controller;

import com.codecock.codecock_backend.dto.ReviewDTO;
import com.codecock.codecock_backend.service.ReviewService;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @Value("${base.url}")
    private String baseUrl; // Base URL for generating file access URLs

    /**
     * 특정 회사의 리뷰 조회
     */
    @GetMapping("/{boardId}")
    public ResponseEntity<List<ReviewDTO>> getUserReviews(@PathVariable("boardId") Integer boardId) {
        List<ReviewDTO> reviews = reviewService.getReviewsByUserId(boardId);
        return ResponseEntity.ok(reviews);
    }

    /**
     * 리뷰 작성
     */
    @PostMapping("/{boardId}/write")
    public ResponseEntity<?> createReview(
            @PathVariable("boardId") Integer boardId,
            @RequestParam("userId") Integer userId,
            @RequestParam("content") String content,
            @RequestParam(value = "file", required = false) MultipartFile file) {

        // ReviewDTO 생성
        ReviewDTO reviewDTO = ReviewDTO.builder()
                .boardId(boardId)
                .userId(userId)
                .content(content)
                .build();

        // 서비스 호출
        ReviewDTO createdReview = reviewService.createReview(reviewDTO);

        return ResponseEntity.status(HttpStatus.CREATED).body(createdReview);
    }

    /**
     * 리뷰 삭제
     */
    @DeleteMapping("/{reviewId}")
    public ResponseEntity<?> deleteReview(@PathVariable("reviewId") Integer reviewId) {
        reviewService.deleteReview(reviewId);
        return ResponseEntity.ok("Review deleted successfully.");
    }
}

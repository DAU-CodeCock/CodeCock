package com.codecock.codecock_backend.service;

import com.codecock.codecock_backend.dto.ReviewDTO;
import com.codecock.codecock_backend.entity.Boards;
import com.codecock.codecock_backend.entity.Review;
import com.codecock.codecock_backend.entity.User;
import com.codecock.codecock_backend.repository.BoardsRepository;
import com.codecock.codecock_backend.repository.ReviewRepository;
import com.codecock.codecock_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final BoardsRepository boardsRepository;
    private final UserRepository userRepository;

    // 댓글 생성
    public ReviewDTO createReview(ReviewDTO reviewDTO) {
        // 게시판 및 유저 조회
        Boards board = boardsRepository.findById(reviewDTO.getBoardId())
                .orElseThrow(() -> new IllegalArgumentException("해당 게시판을 찾을 수 없습니다."));
        User user = userRepository.findById(reviewDTO.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("해당 유저를 찾을 수 없습니다."));

        // Review 엔티티 생성 및 저장
        Review review = Review.builder()
                .board(board)
                .user(user)
                .content(reviewDTO.getContent())
                .build();
        Review savedReview = reviewRepository.save(review);

        // DTO로 반환
        return ReviewDTO.builder()
                .commentId(savedReview.getCommentId())
                .boardId(savedReview.getBoard().getBoardId())
                .userId(savedReview.getUser().getUserId())
                .username(savedReview.getUser().getUsername())
                .content(savedReview.getContent())
                .createdAt(savedReview.getCreatedAt())
                .updatedAt(savedReview.getUpdatedAt())
                .build();
    }

    // 특정 게시판의 댓글 조회
    public List<ReviewDTO> getReviewsByBoardId(Integer boardId) {
        List<Review> reviews = reviewRepository.findByBoard_BoardId(boardId);
        return reviews.stream()
                .map(review -> ReviewDTO.builder()
                        .commentId(review.getCommentId())
                        .boardId(review.getBoard().getBoardId())
                        .userId(review.getUser().getUserId())
                        .username(review.getUser().getUsername())
                        .content(review.getContent())
                        .createdAt(review.getCreatedAt())
                        .updatedAt(review.getUpdatedAt())
                        .build())
                .collect(Collectors.toList());
    }

    // 특정 유저가 작성한 댓글 조회
    public List<ReviewDTO> getReviewsByUserId(Integer userId) {
        List<Review> reviews = reviewRepository.findByUser_UserId(userId);
        return reviews.stream()
                .map(review -> ReviewDTO.builder()
                        .commentId(review.getCommentId())
                        .boardId(review.getBoard().getBoardId())
                        .userId(review.getUser().getUserId())
                        .username(review.getUser().getUsername())
                        .content(review.getContent())
                        .createdAt(review.getCreatedAt())
                        .updatedAt(review.getUpdatedAt())
                        .build())
                .collect(Collectors.toList());
    }

    // 댓글 삭제
    public void deleteReview(Integer commentId) {
        Review review = reviewRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("댓글을 찾을 수 없습니다."));
        reviewRepository.delete(review);
    }
}

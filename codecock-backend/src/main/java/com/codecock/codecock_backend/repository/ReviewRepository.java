package com.codecock.codecock_backend.repository;

import com.codecock.codecock_backend.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Integer> {

    // 특정 게시판의 모든 댓글 조회
    List<Review> findByBoard_BoardId(Integer boardId);

    // 특정 사용자가 작성한 댓글 조회
    List<Review> findByUser_UserId(Integer userId);
}

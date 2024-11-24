package com.codecock.codecock_backend.repository;

import com.codecock.codecock_backend.entity.Boards;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardsRepository extends JpaRepository<Boards, Integer> {

    // 특정 유저가 작성한 게시물 조회
    List<Boards> findByUser_UserId(Integer userId);

    // 제목에 특정 키워드가 포함된 게시물 조회 (검색 기능)
    List<Boards> findByTitleContaining(String keyword);

    // 제목과 내용에서 특정 키워드가 포함된 게시물 조회
    List<Boards> findByTitleContainingOrContentContaining(String titleKeyword, String contentKeyword);

    // 최신 게시물을 상위 10개 가져오기
    List<Boards> findTop10ByOrderByCreatedAtDesc();
}

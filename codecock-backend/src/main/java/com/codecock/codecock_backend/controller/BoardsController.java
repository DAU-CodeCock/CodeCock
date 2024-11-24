package com.codecock.codecock_backend.controller;

import com.codecock.codecock_backend.dto.BoardsDTO;
import com.codecock.codecock_backend.service.BoardsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/boards")
@RequiredArgsConstructor
public class BoardsController {

    private final BoardsService boardsService;

    /**
     * 게시물 생성
     */
    @PostMapping("/create")
    public ResponseEntity<BoardsDTO> createBoard(@RequestBody BoardsDTO boardsDTO) {
        BoardsDTO createdBoard = boardsService.createBoard(boardsDTO);
        return ResponseEntity.ok(createdBoard);
    }

    /**
     * 게시물 상세 조회
     */
    @GetMapping("/{boardId}")
    public ResponseEntity<BoardsDTO> getBoardById(@PathVariable("boardId") Integer boardId) {
        BoardsDTO board = boardsService.getBoardById(boardId);
        return ResponseEntity.ok(board);
    }

    /**
     * 모든 게시물 조회
     */
    @GetMapping("/all")
    public ResponseEntity<List<BoardsDTO>> getAllBoards() {
        List<BoardsDTO> boards = boardsService.getAllBoards();
        return ResponseEntity.ok(boards);
    }

    /**
     * 특정 유저의 게시물 조회
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BoardsDTO>> getBoardsByUserId(@PathVariable("userId") Integer userId) {
        List<BoardsDTO> userBoards = boardsService.getBoardByUserId(userId);
        return ResponseEntity.ok(userBoards);
    }

    /**
     * 게시물 검색
     */
    @GetMapping("/search")
    public ResponseEntity<List<BoardsDTO>> searchBoards(@RequestParam("keyword") String keyword) {
        List<BoardsDTO> results = boardsService.searchBoards(keyword);
        return ResponseEntity.ok(results);
    }

    /**
     * 게시물 수정
     */
    @PutMapping("/{boardId}")
    public ResponseEntity<BoardsDTO> updateBoard(
            @PathVariable("boardId") Integer boardId,
            @RequestBody BoardsDTO boardsDTO) {
        BoardsDTO updatedBoard = boardsService.updateBoard(boardId, boardsDTO);
        return ResponseEntity.ok(updatedBoard);
    }

    /**
     * 게시물 삭제
     */
    @DeleteMapping("/{boardId}")
    public ResponseEntity<String> deleteBoard(@PathVariable("boardId") Integer boardId) {
        boardsService.deleteBoard(boardId);
        return ResponseEntity.ok("게시물이 삭제되었습니다.");
    }
}

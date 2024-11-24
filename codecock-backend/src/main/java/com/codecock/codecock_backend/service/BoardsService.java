package com.codecock.codecock_backend.service;

import com.codecock.codecock_backend.dto.BoardsDTO;
import com.codecock.codecock_backend.entity.Boards;
import com.codecock.codecock_backend.entity.User;
import com.codecock.codecock_backend.repository.BoardsRepository;
import com.codecock.codecock_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class BoardsService {

    private final BoardsRepository boardsRepository;
    private final UserRepository userRepository;

    // 게시물 생성
    public BoardsDTO createBoard(BoardsDTO boardsDTO) {
        User user = userRepository.findById(boardsDTO.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("해당 유저를 찾을 수 없습니다."));

        Boards board = new Boards();
        board.setUser(user);
        board.setTitle(boardsDTO.getTitle());
        board.setContent(boardsDTO.getContent());
        board.setFilePath(boardsDTO.getFilePath());

        Boards savedBoard = boardsRepository.save(board);

        return convertToDTO(savedBoard);
    }

    // 특정 게시물 조회
    public BoardsDTO getBoardById(Integer boardId) {
        Boards board = boardsRepository.findById(boardId)
                .orElseThrow(() -> new IllegalArgumentException("게시물을 찾을 수 없습니다."));
        return convertToDTO(board);
    }

    // 모든 게시물 조회
    public List<BoardsDTO> getAllBoards() {
        return boardsRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // 특정 유저의 게시물 조회
    public List<BoardsDTO> getBoardByUserId(Integer userId) {
        List<Boards> boardsList = boardsRepository.findByUser_UserId(userId);
        return boardsList.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // 게시물 검색 (제목 또는 내용 기반)
    public List<BoardsDTO> searchBoards(String keyword) {
        List<Boards> boardsList = boardsRepository.findByTitleContainingOrContentContaining(keyword, keyword);
        return boardsList.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // 게시물 수정
    public BoardsDTO updateBoard(Integer boardId, BoardsDTO boardsDTO) {
        Boards board = boardsRepository.findById(boardId)
                .orElseThrow(() -> new IllegalArgumentException("게시물을 찾을 수 없습니다."));

        board.setTitle(boardsDTO.getTitle());
        board.setContent(boardsDTO.getContent());
        board.setFilePath(boardsDTO.getFilePath());

        Boards updatedBoard = boardsRepository.save(board);

        return convertToDTO(updatedBoard);
    }

    // 게시물 삭제
    public void deleteBoard(Integer boardId) {
        Boards board = boardsRepository.findById(boardId)
                .orElseThrow(() -> new IllegalArgumentException("게시물을 찾을 수 없습니다."));
        boardsRepository.delete(board);
    }

    // DTO 변환 메서드
    private BoardsDTO convertToDTO(Boards board) {
        return new BoardsDTO(
                board.getBoardId(),
                board.getUser().getUserId(),
                board.getTitle(),
                board.getContent(),
                board.getFilePath(),
                board.getCreatedAt()
        );
    }
}


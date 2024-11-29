package com.codecock.codecock_backend.controller;

import com.codecock.codecock_backend.dto.BoardsDTO;
import com.codecock.codecock_backend.dto.ReviewDTO;
import com.codecock.codecock_backend.dto.users.UserDTO;
import com.codecock.codecock_backend.dto.users.UserToken;
import com.codecock.codecock_backend.dto.users.LoginRequest;
import com.codecock.codecock_backend.dto.users.CheckUserIdRequest;

import com.codecock.codecock_backend.entity.User;
import com.codecock.codecock_backend.service.BoardsService;
import com.codecock.codecock_backend.service.ReviewService;
import com.codecock.codecock_backend.service.UserService;
import com.codecock.codecock_backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService; // 유저 서비스
    private final UserRepository userRepository;
    private final BoardsService boardsService;
    private final ReviewService reviewService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        // 유저 아이디를 이용해 사용자 조회
        UserDTO loginUser = userService.checkUserById(loginRequest.getUsername());
        if (loginUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid user");
        }

        // 유저 비밀번호 확인
        if (!Objects.equals(loginUser.getPassword(), loginRequest.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid password");
        }

        // JWT 토큰 생성
        UserToken usertoken = new UserToken();
        usertoken.setUserId(loginUser.getUserId());
        usertoken.setUsername(loginUser.getUsername());
        usertoken.setUserStatus(loginUser.getUserStatus());
        return ResponseEntity.status(HttpStatus.OK).body(usertoken);
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserDTO userDTO) {
        boolean usernameExists = userService.checkUsernameExists(userDTO.getUsername());
        boolean studentIdExists = userService.checkStudentIdExists(userDTO.getStudentId());
        boolean emailExists = userService.checkEmailExists(userDTO.getEmail());

        if (usernameExists || studentIdExists || emailExists) {
            String errorMessage = "다음 정보가 중복되었습니다: ";
            if (usernameExists) errorMessage += "username ";
            if (studentIdExists) errorMessage += "studentId ";
            if (emailExists) errorMessage += "email";
            return ResponseEntity.status(HttpStatus.CONFLICT).body(errorMessage.trim());
        }

        // 회원가입 처리
        UserDTO createdUser = userService.createUser(userDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

    @GetMapping("/{userId}/profile")
    public ResponseEntity<UserDTO> getUserProfile(@PathVariable Integer userId) {
        UserDTO userDTO = userService.getUserProfile(userId);
        return userDTO != null ? ResponseEntity.ok(userDTO) : ResponseEntity.notFound().build();
    }

    @PutMapping("/{userId}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable Integer userId, @RequestBody UserDTO userDTO) {
        UserDTO updatedUser = userService.updateUser(userId, userDTO);
        return updatedUser != null ? ResponseEntity.ok(updatedUser) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable Integer userId) {
        boolean isDeleted = userService.deleteUser(userId);
        return isDeleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    @GetMapping("/userinfo/{userId}/questions")
    public ResponseEntity<List<BoardsDTO>> getUserQuestions(@PathVariable("userId") Integer userId) {
        List<BoardsDTO> questions = boardsService.getBoardByUserId(userId);
        return ResponseEntity.ok(questions);
    }

    @GetMapping("/userinfo/{userId}/reviews")
    public ResponseEntity<List<ReviewDTO>> getUserReviews(@PathVariable("userId") Integer userId) {
        List<ReviewDTO> reviews = reviewService.getReviewsByUserId(userId);
        return ResponseEntity.ok(reviews);
    }

    @GetMapping("/userinfo/{userId}")
    public ResponseEntity<UserDTO> getUserInfos(@PathVariable("userId") Integer userNum) {
        // userNum으로 User 엔티티를 조회
        User user = userRepository.findById(userNum)
                .orElseThrow(() -> new RuntimeException("User not found with userNum: " + userNum));

        // 필요한 필드만 포함된 UserDTO 생성
        UserDTO userDTO = UserDTO.builder()
                .username(user.getUsername())
                .name(user.getName())
                .studentId(user.getStudentId())
                .email(user.getEmail())
                .phone(user.getPhone())
                .userStatus(user.getUserStatus())
                .build();

        return ResponseEntity.ok(userDTO);
    }

    // 멘토 승격 엔드포인트 추가
    @PostMapping("/{userId}/promoteToMentor")
    public ResponseEntity<String> promoteToMentor(@PathVariable Integer userId) {
        boolean promoted = userService.promoteToMentor(userId);
        if (promoted) {
            return ResponseEntity.status(HttpStatus.OK).body("User promoted to Mentor");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User is already a Mentor or cannot be promoted");
        }    
    }

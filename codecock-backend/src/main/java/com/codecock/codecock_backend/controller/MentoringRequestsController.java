package com.example.codecock_backend.controller;

import com.example.codecock_backend.entity.MentoringRequest;
import com.example.codecock_backend.service.MentoringRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mentoring-requests")
@RequiredArgsConstructor
public class MentoringRequestController {

    private final MentoringRequestService mentoringRequestService;

    // 특정 멘토의 신청 목록 가져오기
    @GetMapping("/mentor/{mentorId}")
    public ResponseEntity<List<MentoringRequest>> getMentoringRequestsForMentor(@PathVariable Integer mentorId) {
        List<MentoringRequest> requests = mentoringRequestService.getMentoringRequestsByMentorId(mentorId);
        return ResponseEntity.ok(requests);
    }

    // 특정 멘티의 신청 목록 가져오기
    @GetMapping("/mentee/{menteeId}")
    public ResponseEntity<List<MentoringRequest>> getMentoringRequestsForMentee(@PathVariable Integer menteeId) {
        List<MentoringRequest> requests = mentoringRequestService.getMentoringRequestsByMenteeId(menteeId);
        return ResponseEntity.ok(requests);
    }

    // 멘토링 신청 생성
    @PostMapping
    public ResponseEntity<MentoringRequest> createMentoringRequest(@RequestBody MentoringRequest request) {
        MentoringRequest createdRequest = mentoringRequestService.createMentoringRequest(request);
        return ResponseEntity.ok(createdRequest);
    }

    // 신청 상태 업데이트 (승인 또는 거부)
    @PutMapping("/{requestId}")
    public ResponseEntity<MentoringRequest> updateRequestStatus(
            @PathVariable Integer requestId,
            @RequestParam MentoringRequest.Status status) {
        MentoringRequest updatedRequest = mentoringRequestService.updateRequestStatus(requestId, status);
        return ResponseEntity.ok(updatedRequest);
    }

    @DeleteMapping("/{requestId}")
        public ResponseEntity<String> rejectMentoringRequest(@PathVariable Integer requestId) {
        try {
            mentoringRequestService.rejectRequest(requestId);
            return ResponseEntity.ok("Request has been rejected and deleted.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body("Request not found");
        }
    }
}

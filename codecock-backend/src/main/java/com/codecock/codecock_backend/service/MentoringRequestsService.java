package com.example.codecock_backend.service;

import com.example.codecock_backend.entity.MentoringRequest;
import com.example.codecock_backend.repository.MentoringRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MentoringRequestService {

    private final MentoringRequestRepository mentoringRequestRepository;

    public List<MentoringRequest> getMentoringRequestsByMentorId(Integer mentorId) {
        return mentoringRequestRepository.findByMentorId(mentorId);
    }

    public List<MentoringRequest> getMentoringRequestsByMenteeId(Integer menteeId) {
        return mentoringRequestRepository.findByMenteeId(menteeId);
    }

    public MentoringRequest createMentoringRequest(MentoringRequest request) {
        return mentoringRequestRepository.save(request);
    }

    public MentoringRequest updateRequestStatus(Integer requestId, MentoringRequest.Status status) {
        MentoringRequest request = mentoringRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));
        request.setStatus(status);
        request.setUpdatedAt(java.time.LocalDateTime.now());
        return mentoringRequestRepository.save(request);
    }

    public void rejectRequest(Integer requestId) {
        if (!mentoringRequestRepository.existsById(requestId)) {
            throw new RuntimeException("Request not found");
        }
        mentoringRequestRepository.deleteById(requestId);
    }

}

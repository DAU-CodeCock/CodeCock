package com.example.codecock_backend.repository;

import com.example.codecock_backend.entity.MentoringRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MentoringRequestRepository extends JpaRepository<MentoringRequest, Integer> {
    List<MentoringRequest> findByMentorId(Integer mentorId);
    List<MentoringRequest> findByMenteeId(Integer menteeId);
}

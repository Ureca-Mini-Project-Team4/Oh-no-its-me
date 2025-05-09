package com.uplus.eureka.candidate.controller;

import com.uplus.eureka.candidate.model.dto.Candidate;
import com.uplus.eureka.candidate.model.service.CandidateService;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CandidateController {

    private final CandidateService candidateService;

    public CandidateController(CandidateService candidateService) {
        this.candidateService = candidateService;
    }

    @PostMapping("/api/candidate")
    public ResponseEntity<?> createCandidates() {
        try {
            candidateService.resetIsSelected();
            List<Candidate> candidates = candidateService.createCandidates();
            return ResponseEntity.ok(candidates);

        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("후보자 생성 중 예상치 못한 오류가 발생했습니다.");
        }
    }
}

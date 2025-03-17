package com.uplus.eureka.candidate.controller;

import com.uplus.eureka.candidate.model.dto.Candidate;
import com.uplus.eureka.candidate.model.service.CandidateService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CandidateController {

    private final CandidateService candidateService;

    public CandidateController(CandidateService candidateService) {
        this.candidateService = candidateService;
    }

    // @PathVariable을 사용하여 동적 경로로 후보 정보를 가져옴
    @GetMapping("api/candidate/{pollId}")
    public ResponseEntity<?> getCandidates(@PathVariable("pollId") int pollId) {
        try {
            // pollId에 맞는 후보 리스트를 가져옴
            return ResponseEntity.ok(candidateService.getCandidates(pollId));
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Candidates not found for pollId " + pollId);
        }
    }
}

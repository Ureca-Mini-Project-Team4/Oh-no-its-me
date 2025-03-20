package com.uplus.eureka.candidate.controller;

import com.uplus.eureka.candidate.model.service.CandidateService;

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

    @PostMapping("api/candidate")
    public ResponseEntity<?> createCandidates() {
        try {
            // 후보자 생성 로직을 CandidateService에서 처리하도록 호출
            candidateService.createCandidates();
            return ResponseEntity.status(HttpStatus.CREATED).build(); // 생성 성공
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage()); // 에러 발생 시
        }
    }
}


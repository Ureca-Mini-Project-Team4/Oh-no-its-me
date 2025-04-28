package com.uplus.eureka.candidate.controller;

import com.uplus.eureka.candidate.model.service.CandidateService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
            candidateService.resetIsSelected();
            candidateService.createCandidates();
            return ResponseEntity.status(HttpStatus.CREATED).body("후보자를 생성했습니다.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("후보자 생성 중 예상치 못한 오류가 발생했습니다.");
        }
    }
}

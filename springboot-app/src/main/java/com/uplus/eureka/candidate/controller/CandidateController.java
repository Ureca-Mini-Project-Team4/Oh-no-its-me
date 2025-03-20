package com.uplus.eureka.candidate.controller;

import com.uplus.eureka.candidate.model.dto.Candidate;
import com.uplus.eureka.candidate.model.service.CandidateService;
import com.uplus.eureka.candidate.model.dto.CandidateNotFoundException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@Tag(name = "Poll Management API", description = "투표 관리 API")
@RestController
public class CandidateController {

    private final CandidateService candidateService;

    public CandidateController(CandidateService candidateService) {
        this.candidateService = candidateService;
    }

    @Operation(summary = "투표의 모든 후보자 조회", description = "해당 투표의 모든 후보자 조회")
    @GetMapping("api/candidate/{pollId}")
    public ResponseEntity<?> getCandidates(@PathVariable("pollId") int pollId) {
        try {
            List<Candidate> candidates = candidateService.getCandidates(pollId);
            if (candidates.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(candidates);
        } catch (Exception e) {
            throw new CandidateNotFoundException("Candidates not found for pollId " + pollId, e);
        }
    }
}

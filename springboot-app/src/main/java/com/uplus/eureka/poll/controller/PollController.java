package com.uplus.eureka.poll.controller;

import com.uplus.eureka.poll.model.dto.Question;
import com.uplus.eureka.poll.model.service.PollService;
import com.uplus.eureka.poll.model.dto.PollServiceException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@Tag(name = "Candidate Management API", description = "후보자 관리 API")
@RestController
@RequestMapping("/api")
public class PollController {

    private final PollService pollService;

    public PollController(PollService pollService) {
        this.pollService = pollService;
    }

    @Operation(summary = "모든 투표 조회", description = "모든 투표 가져오기")
    @GetMapping("/poll")
    public ResponseEntity<List<Question>> getRandomQuestions() {
        try {
            List<Question> questions = pollService.getQuestions();
            if (questions.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(questions);
        } catch (Exception e) {
            throw new PollServiceException("Failed to retrieve poll questions", e);
        }
    }
}

package com.uplus.eureka.poll.controller;

import com.uplus.eureka.poll.model.dto.Question;
import com.uplus.eureka.poll.model.service.PollService;
import com.uplus.eureka.poll.model.dto.PollServiceException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api")
public class PollController {

    private final PollService pollService;

    public PollController(PollService pollService) {
        this.pollService = pollService;
    }

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

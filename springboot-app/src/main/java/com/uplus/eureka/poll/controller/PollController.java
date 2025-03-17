package com.uplus.eureka.poll.controller;

import com.uplus.eureka.poll.model.dto.Question;
import com.uplus.eureka.poll.model.service.PollService;
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
        List<Question> questions = pollService.getQuestions();  // 랜덤 4개 질문을 가져옴
        if (questions.isEmpty()) {
            return ResponseEntity.noContent().build();  // 빈 리스트라면 204 No Content
        }
        return ResponseEntity.ok(questions);  // 정상적으로 200 OK로 반환
    }
}


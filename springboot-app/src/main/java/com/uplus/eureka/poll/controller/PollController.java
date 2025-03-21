package com.uplus.eureka.poll.controller;

import com.uplus.eureka.poll.model.dto.PollServiceException;
import com.uplus.eureka.poll.model.dto.Question;
import com.uplus.eureka.poll.model.service.PollService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api")
public class PollController {

    private final PollService pollService;

    public PollController(PollService pollService) {
        this.pollService = pollService;
    }

    @GetMapping("/poll")
    public ResponseEntity<?> getRandomQuestions() {
        try {
            List<Question> questions = pollService.getQuestions();
            
            // 질문이 없을 경우, 예외를 던짐
            if (questions.isEmpty()) {
                throw new PollServiceException("선택할 투표 질문이 없습니다.");
            }

            // 질문이 있을 경우, 투표 질문에 시간 정보 추가
            LocalDateTime now = LocalDateTime.now();
            LocalDateTime startTime = now.withHour(8).withMinute(0).withSecond(0).withNano(0);
            LocalDateTime endTime = now.withHour(16).withMinute(0).withSecond(0).withNano(0);

            for (Question question : questions) {
                question.setStartTime(startTime);
                question.setEndTime(endTime);
                pollService.putQuestions(question);
            }

            return ResponseEntity.ok(questions);
        } catch (PollServiceException e) {
            // 예외가 발생하면 404 상태 코드와 함께 메시지 전송
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}



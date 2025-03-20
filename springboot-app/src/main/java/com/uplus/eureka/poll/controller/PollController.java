package com.uplus.eureka.poll.controller;

import com.uplus.eureka.poll.model.dto.PollServiceException;
import com.uplus.eureka.poll.model.dto.Question;
import com.uplus.eureka.poll.model.service.PollService;
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
    public ResponseEntity<List<Question>> getRandomQuestions() {
        try {
            List<Question> questions = pollService.getQuestions();
            if (questions.isEmpty()) {
                return ResponseEntity.noContent().build();
            }

            // 현재 날짜 기준으로 start_time과 end_time 설정
            LocalDateTime now = LocalDateTime.now();
            LocalDateTime startTime = now.withHour(8).withMinute(0).withSecond(0).withNano(0); // 오전 8시
            LocalDateTime endTime = now.withHour(16).withMinute(0).withSecond(0).withNano(0); // 오후 4시

            // 각 질문에 대해 Question 객체에 startTime, endTime 설정 후 DB 저장
            for (Question question : questions) {
                // startTime과 endTime을 Question 객체에 저장하는 방식으로 진행
                question.setStartTime(startTime);  // 동일한 startTime 설정
                question.setEndTime(endTime);  // 동일한 endTime 설정

                // DB에 저장
                pollService.putQuestions(question);  // pollService에서 질문을 DB에 저장하는 메서드 호출
            }

            return ResponseEntity.ok(questions);
        } catch (Exception e) {
            throw new PollServiceException("Failed to retrieve poll questions", e);
        }
    }
}

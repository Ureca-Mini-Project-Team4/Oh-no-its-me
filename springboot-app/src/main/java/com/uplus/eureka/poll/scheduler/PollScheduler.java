package com.uplus.eureka.poll.scheduler;

import com.uplus.eureka.poll.model.dto.Question;
import com.uplus.eureka.poll.model.service.PollService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class PollScheduler {

    private final PollService pollService;

    public PollScheduler(PollService pollService) {
        this.pollService = pollService;
    }

    @Scheduled(cron = "0 0 14 * * ?") // 오후 2시 정각
    public void runPutQuestions() {
        Question question = new Question(); // 설정할 값이 있다면 여기에
        pollService.putQuestions(question);
    }
}

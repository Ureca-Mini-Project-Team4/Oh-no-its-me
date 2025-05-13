package com.uplus.eureka.poll.scheduler;

import com.uplus.eureka.poll.controller.PollController;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class PollScheduler {

    private final PollController pollController;

    public PollScheduler(PollController pollController) {
        this.pollController = pollController;
    }

    @Scheduled(cron = "0 20 16 * * ?")
    public void runPutQuestions() {
        pollController.getRandomQuestions();
    }
}

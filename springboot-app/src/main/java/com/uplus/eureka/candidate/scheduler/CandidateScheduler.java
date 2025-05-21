package com.uplus.eureka.candidate.scheduler;

import com.uplus.eureka.candidate.controller.CandidateController;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class CandidateScheduler {

    private final CandidateController candidateController;

    public CandidateScheduler(CandidateController candidateController) {
        this.candidateController = candidateController;
    }

    @Scheduled(cron = "0 59 07 * * ?", zone = "Asia/Seoul")
    public void runCreateCandidates() {
    	candidateController.createCandidates();
    }
}

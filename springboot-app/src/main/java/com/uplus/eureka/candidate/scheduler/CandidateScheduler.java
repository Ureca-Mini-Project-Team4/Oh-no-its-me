package com.uplus.eureka.candidate.scheduler;

import com.uplus.eureka.candidate.model.service.CandidateService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class CandidateScheduler {

    private final CandidateService candidateService;

    public CandidateScheduler(CandidateService candidateService) {
        this.candidateService = candidateService;
    }

    @Scheduled(cron = "0 1 16 * * ?") // 오후 4시 1분
    public void runCreateCandidates() {
        candidateService.createCandidates();
    }
}

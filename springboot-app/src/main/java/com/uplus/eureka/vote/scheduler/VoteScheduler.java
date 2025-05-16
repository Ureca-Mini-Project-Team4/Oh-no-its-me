package com.uplus.eureka.vote.scheduler;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import com.uplus.eureka.vote.contoller.VoteController;

@Component
public class VoteScheduler {
	private final VoteController voteController;
	
    public VoteScheduler(VoteController voteController) {
        this.voteController = voteController;
    }

    @Scheduled(cron = "0 00 00 * * ?", zone = "Asia/Seoul")
    public void runPatchVoted() {
    	voteController.resetVoted();
    }
}

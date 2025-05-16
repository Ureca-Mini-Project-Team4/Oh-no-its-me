package com.uplus.eureka.vote.model.service;

import com.uplus.eureka.vote.model.dto.VoteResult;
import com.uplus.eureka.vote.model.dto.VoteRequest;

public interface VoteService {
    VoteResult getVoteResult(int pollId);
    void increaseVoteCount(int pollId, VoteRequest voteRequest);
    boolean completeVote(int userId);
    void resetIsVoted();
}

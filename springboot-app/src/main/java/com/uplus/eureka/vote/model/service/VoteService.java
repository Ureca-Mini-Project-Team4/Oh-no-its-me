package com.uplus.eureka.vote.model.service;

import com.uplus.eureka.vote.model.dto.VoteResult;

public interface VoteService {
    VoteResult getVoteResult(int pollId);
    void increaseVoteCount(int candidateId);
}

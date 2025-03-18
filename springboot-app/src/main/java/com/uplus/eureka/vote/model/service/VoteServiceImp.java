package com.uplus.eureka.vote.model.service;

import com.uplus.eureka.vote.model.dao.VoteDao;
import com.uplus.eureka.vote.model.dto.VoteResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;

@Service
public class VoteServiceImp implements VoteService {

    private final VoteDao voteDao;

    @Autowired
    public VoteServiceImp(VoteDao voteDao) {
        this.voteDao = voteDao;
    }

   @Override
    public VoteResult getVoteResult(int pollId) {
        VoteResult.Result topCandidate = voteDao.findTopCandidateByPollId(pollId);
        if (topCandidate == null) {
            throw new RuntimeException("해당 투표가 존재하지 않습니다.");
        }

        String questionText = voteDao.findQuestionTextByPollId(pollId);

        VoteResult resultDto = new VoteResult();
        resultDto.setPollId(pollId);
        resultDto.setQuestionText(questionText);
        resultDto.setResults(Collections.singletonList(topCandidate));

        return resultDto;
    }

    @Override
    @Transactional
    public void increaseVoteCount(int candidateId) {
        int result = voteDao.incrementVoteCount(candidateId);

        if (result == 0) {
            throw new RuntimeException("해당 후보자를 찾을 수 없습니다.");
        }
    }
}

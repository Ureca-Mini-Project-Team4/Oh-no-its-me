package com.uplus.eureka.vote.model.service;

import com.uplus.eureka.user.model.dao.UserDao;
import com.uplus.eureka.vote.model.dao.VoteDao;
import com.uplus.eureka.vote.model.dto.VoteResult;
import com.uplus.eureka.vote.model.dto.VoteRequest;
import com.uplus.eureka.vote.model.exception.VoteException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;

@Service
public class VoteServiceImp implements VoteService {

    private final VoteDao voteDao;
    private final UserDao userDao;

    @Autowired
    public VoteServiceImp(VoteDao voteDao, UserDao userDao) {
        this.voteDao = voteDao;
        this.userDao = userDao;
    }

   @Override
    public VoteResult getVoteResult(int pollId) {
        VoteResult.Result topCandidate = voteDao.findTopCandidateByPollId(pollId);
        if (topCandidate == null) {
            throw new VoteException("해당 투표가 존재하지 않습니다.", HttpStatus.NOT_FOUND);
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
    public void increaseVoteCount(int pollId, VoteRequest voteRequest) {
        int updatedRows = voteDao.incrementVoteCount(voteRequest);
        if (updatedRows == 0) {
            throw new VoteException("해당 후보자를 찾을 수 없습니다.",HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public boolean completeVote(int userId) {
        if (voteDao.completeVote(userId) == 0) {
            throw  new VoteException("유저가 존재하지 않거나 이미 투표 완료됨", HttpStatus.BAD_REQUEST);
        }
        return true;
    }
}

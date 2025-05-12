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
import java.util.Map;

@Service
@Transactional
public class VoteServiceImp implements VoteService {

    private final VoteDao voteDao;

    @Autowired
    public VoteServiceImp(VoteDao voteDao, UserDao userDao) {
        this.voteDao = voteDao;
    }

   @Override
    public VoteResult getVoteResult(int pollId) {
        VoteResult.Result topCandidate = voteDao.findTopCandidateByPollId(pollId);
        if (topCandidate == null) {
            throw new VoteException("해당 투표가 존재하지 않습니다.", HttpStatus.NOT_FOUND);
        }

        VoteResult.Question topQuestion = voteDao.findQuestionByPollId(pollId);
        String questionText = topQuestion.questionText;
        String icon = topQuestion.icon;

        VoteResult resultDto = new VoteResult();
        resultDto.setPollId(pollId);
        resultDto.setQuestionText(questionText);
        resultDto.setIcon(icon);
        resultDto.setResults(Collections.singletonList(topCandidate));

        return resultDto;
    }

    @Override
    public void increaseVoteCount(int pollId, VoteRequest voteRequest) {
        int updatedRows = voteDao.incrementVoteCount(voteRequest);
        if (updatedRows == 0) {
            throw new VoteException("해당 후보자를 찾을 수 없습니다.",HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public boolean completeVote(int userId) {
        int updated = voteDao.completeVote(userId);
        if (updated == 0) {
            throw new VoteException("존재하지 않는 유저입니다.", HttpStatus.BAD_REQUEST);
        }
        return true;
    }
}

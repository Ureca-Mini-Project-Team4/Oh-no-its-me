package com.uplus.eureka.vote.model.service;

import com.uplus.eureka.user.model.dao.UserDao;
import com.uplus.eureka.user.model.dto.User;
import com.uplus.eureka.user.model.dto.UserException;
import com.uplus.eureka.vote.model.dao.VoteDao;
import com.uplus.eureka.vote.model.dto.VoteResult;
import com.uplus.eureka.vote.model.dto.VoteRequest;
import org.springframework.beans.factory.annotation.Autowired;
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
    public void increaseVoteCount(int pollId, VoteRequest voteRequest) {
        int updatedRows = voteDao.incrementVoteCount(voteRequest);
        if (updatedRows == 0) {
            throw new RuntimeException("해당 후보자를 찾을 수 없습니다.");
        }
    }

//    @Override
//    public void completeVote(Integer userId) throws UserException {
//        User user = userDao.getUser(userId);
//        if (user == null) {
//            throw new UserException("등록되지 않은 아이디입니다.");
//        }
//    }
    @Override
    public boolean completeVote(int userId) {
        return voteDao.completeVote(userId) > 0;  // 업데이트된 행이 1개 이상이면 true 반환
    }
}

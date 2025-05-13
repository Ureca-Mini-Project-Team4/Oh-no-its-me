package com.uplus.eureka.poll.model.service;

import com.uplus.eureka.poll.model.dto.PollServiceException;
import com.uplus.eureka.poll.model.dto.Question;
import com.uplus.eureka.poll.model.dao.PollDao;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class PollServiceImp implements PollService {

    private final PollDao pollDao;

    public PollServiceImp(PollDao pollDao) {
        this.pollDao = pollDao;
    }

    @Override
    public List<Question> getQuestions() {
        List<Question> questions = pollDao.getQuestions();

        if (questions.isEmpty()) {
            throw new PollServiceException("선택할 투표 질문이 없습니다.");  // 빈 질문 리스트일 경우 예외 처리
        }

        return questions;
    }

    @Override
    public void putQuestions(Question question) {
        pollDao.putQuestions(question);
    }
    
    @Override
    public List<Integer> getLatestPollIds() {
        return pollDao.getLatestPollIds(); // MyBatis mapper에서 실제 쿼리 실행
    }
}



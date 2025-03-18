package com.uplus.eureka.poll.model.service;

import com.uplus.eureka.poll.model.dao.PollDao;
import com.uplus.eureka.poll.model.dto.Question;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PollServiceImp implements PollService {

    private final PollDao pollDao;

    // PollDao는 MyBatis에서 자동으로 주입
    public PollServiceImp(PollDao pollDao) {
        this.pollDao = pollDao;
    }

    @Override
    public List<Question> getQuestions() {
        return pollDao.getQuestions();  // PollDao에서 질문 목록을 가져옴
    }
}

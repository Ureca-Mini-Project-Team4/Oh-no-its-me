package com.uplus.eureka.poll.model.service;

import com.uplus.eureka.poll.model.dto.Question;
import com.uplus.eureka.poll.model.dao.PollDao;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class PollServiceImp implements PollService {  // PollService 인터페이스 구현

    private final PollDao pollDao;

    public PollServiceImp(PollDao pollDao) {
        this.pollDao = pollDao;
    }

    @Override
    public List<Question> getQuestions() {
        return pollDao.getQuestions();
    }

    @Override
    public void putQuestions(Question question) {
        pollDao.putQuestions(question);
    }
}

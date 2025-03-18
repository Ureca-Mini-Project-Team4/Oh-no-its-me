package com.uplus.eureka.poll.model.service;

import com.uplus.eureka.poll.model.dto.Question;
import java.util.List;

public interface PollService {
    List<Question> getQuestions();
}

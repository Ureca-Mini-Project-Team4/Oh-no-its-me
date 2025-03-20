package com.uplus.eureka.poll.model.dao;

import com.uplus.eureka.poll.model.dto.Question;
import java.util.List;

public interface PollDao {

    // 랜덤 질문을 가져오는 메서드
    List<Question> getQuestions();

    // 질문을 DB에 저장하는 메서드
    void putQuestions(Question question);
}

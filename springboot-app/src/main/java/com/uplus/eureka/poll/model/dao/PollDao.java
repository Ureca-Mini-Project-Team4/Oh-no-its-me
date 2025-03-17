package com.uplus.eureka.poll.model.dao;

import com.uplus.eureka.poll.model.dto.Question;
import java.util.List;

public interface PollDao {
    List<Question> getQuestions();  // 질문을 랜덤으로 가져오는 메서드
}

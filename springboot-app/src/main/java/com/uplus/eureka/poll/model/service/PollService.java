package com.uplus.eureka.poll.model.service;

import com.uplus.eureka.poll.model.dto.Question;
import java.util.List;

public interface PollService {
    // 랜덤 질문들을 가져오는 메서드
    List<Question> getQuestions();  

    // 각 Question 객체를 DB에 저장하는 메서드
    void putQuestions(Question question);  
}

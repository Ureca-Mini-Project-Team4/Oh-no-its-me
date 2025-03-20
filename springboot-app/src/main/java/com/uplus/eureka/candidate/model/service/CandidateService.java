package com.uplus.eureka.candidate.model.service;

import com.uplus.eureka.candidate.model.dao.CandidateDao;
import com.uplus.eureka.candidate.model.dto.Candidate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CandidateService {

    private final CandidateDao candidateDao;

    public CandidateService(CandidateDao candidateDao) {
        this.candidateDao = candidateDao;
    }

    public void createCandidates() {
        // 1. poll_id가 가장 높은 순으로 4개의 poll_id를 가져옵니다.
        List<Integer> pollIds = candidateDao.getTopPollIds(4);
        
        // 2. 각 poll_id에 대해 is_selected가 false인 user_id 4명을 랜덤으로 선택
        for (Integer pollId : pollIds) {
            List<Integer> userIds = candidateDao.getRandomUsersForPoll(pollId, 4);
            
            // 3. candidates에 user_id와 poll_id를 삽입
            for (Integer userId : userIds) {
                candidateDao.insertCandidate(userId, pollId);
                
                // 4. 해당 user_id의 is_selected 값을 true로 업데이트
                candidateDao.updateUserSelectedStatus(userId);
            }
        }
    }
}


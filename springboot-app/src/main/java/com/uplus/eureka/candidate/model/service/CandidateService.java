package com.uplus.eureka.candidate.model.service;

import com.uplus.eureka.candidate.model.dao.CandidateDao;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CandidateService {

    private final CandidateDao candidateDao;

    public CandidateService(CandidateDao candidateDao) {
        this.candidateDao = candidateDao;
    }

    public void createCandidates() {
        try {
            // 1. poll_id가 가장 높은 순으로 4개의 poll_id를 가져옴
            List<Integer> pollIds = candidateDao.getTopPollIds(4);
            if (pollIds.isEmpty()) {
                throw new RuntimeException("선택할 수 있는 투표가 없습니다.");
            }

            // 2. 각 poll_id에 대해 is_selected가 false인 user_id 4명을 랜덤으로 선택
            for (Integer pollId : pollIds) {
                List<Integer> userIds = candidateDao.getRandomUsersForPoll(pollId, 4);
                if (userIds.isEmpty()) {
                    throw new RuntimeException("poll_id " + pollId + "에 대해 선택할 수 있는 사용자가 없습니다.");
                }

                // 3. candidates에 user_id와 poll_id를 삽입
                for (Integer userId : userIds) {
                    candidateDao.insertCandidate(userId, pollId);

                    // 4. 해당 user_id의 is_selected 값을 true로 업데이트
                    candidateDao.updateUserSelectedStatus(userId);
                }
            }
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage(), e);
        }
    }
}

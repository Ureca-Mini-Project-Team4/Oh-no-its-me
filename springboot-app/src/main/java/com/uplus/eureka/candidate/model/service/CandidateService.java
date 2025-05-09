package com.uplus.eureka.candidate.model.service;

import com.uplus.eureka.candidate.model.dao.CandidateDao;
import com.uplus.eureka.candidate.model.dto.Candidate;

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

    public List<String> createCandidates() {
        List<String> result = new java.util.ArrayList<>();

        try {
            // 1. poll_id가 가장 높은 순으로 4개의 poll_id를 가져옴
            List<Candidate.PollInfo> pollInfos = candidateDao.getTopPollIds(4);
            if (pollInfos.isEmpty()) {
                throw new RuntimeException("선택할 수 있는 투표가 없습니다.");
            }

            // 2. 각 poll_id에 대해 is_selected가 false인 user_id 4명을 랜덤으로 선택
            for (Candidate.PollInfo pollInfo : pollInfos) {
                int pollId = pollInfo.getPollId();
                String questionText = pollInfo.getQuestionText();
                List<Candidate.UserInfo> users = candidateDao.getRandomUsersForPoll(pollId, 4);

                if (users.isEmpty()) {
                    throw new RuntimeException("poll_id " + pollId + "에 대해 선택할 수 있는 사용자가 없습니다.");
                }

                // 3. 후보 삽입 및 toString() 저장
                for (Candidate.UserInfo user : users) {
                    int userId = user.getUserId();
                    String userName = user.getUserName();

                    candidateDao.updateUserSelectedStatus(userId);

                    Candidate candidate = new Candidate();
                    candidate.setUserId(userId);
                    candidate.setUserName(userName);
                    candidate.setPollId(pollId);
                    candidate.setQuestionText(questionText);

                    candidateDao.insertCandidate(candidate); // candidateId 자동 세팅

                    result.add(candidate.toString());
                }
            }

            return result;
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage(), e);
        }
    }

    
    public void resetIsSelected() {
    	try {
    	candidateDao.updateUserSelectedFalse();
    } catch(Exception e) {
        throw new RuntimeException(e.getMessage(), e);
    	}
    }
}

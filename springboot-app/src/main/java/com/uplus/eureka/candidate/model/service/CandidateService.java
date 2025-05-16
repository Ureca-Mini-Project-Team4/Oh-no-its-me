package com.uplus.eureka.candidate.model.service;

import com.uplus.eureka.candidate.model.dao.CandidateDao;
import com.uplus.eureka.candidate.model.dto.Candidate;
import com.uplus.eureka.candidate.model.dto.Candidate.CandidateInfo;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class CandidateService {

    private final CandidateDao candidateDao;

    public CandidateService(CandidateDao candidateDao) {
        this.candidateDao = candidateDao;
    }
    
    public List<CandidateInfo> getTopCandidate() {
    	List<CandidateInfo> result = new ArrayList<>();

    	try {
    		List<CandidateInfo> candidateInfos = candidateDao.getTopCandidate();
    		if (candidateInfos.isEmpty()) {
    			throw new RuntimeException("선택할 수 있는 후보자가 없습니다.");
    		}
    		
    		for (CandidateInfo candidateInfo: candidateInfos) {
    			result.add(candidateInfo);
    		}
    		return result;
    		
    	} catch (Exception e) {
            throw new RuntimeException(e.getMessage(), e);
    	}
    }

    public List<Candidate> createCandidates() {
        List<Candidate> result = new ArrayList<>();

        try {
            List<Candidate.PollInfo> pollInfos = candidateDao.getTopPollIds();
            if (pollInfos.isEmpty()) {
                throw new RuntimeException("선택할 수 있는 투표가 없습니다.");
            }

            for (Candidate.PollInfo pollInfo : pollInfos) {
                int pollId = pollInfo.getPollId();
                List<Candidate.UserInfo> users = candidateDao.getRandomUsersForPoll(pollId);

                if (users.isEmpty()) {
                    throw new RuntimeException("poll_id " + pollId + "에 대해 선택할 수 있는 사용자가 없습니다.");
                }
                

                for (Candidate.UserInfo user : users) {
                    int userId = user.getUserId();

                    Candidate candidate = new Candidate();
                    candidateDao.updateUserSelectedStatus(userId);
                    
                    candidate.setPollId(pollId);
                    candidate.setUserId(userId);
                    candidateDao.insertCandidate(candidate);
                    
                    candidate.setQuestionText(pollInfo.getQuestionText());
                    candidate.setUserName(user.getUserName());
                    
                    result.add(candidate);
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

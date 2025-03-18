package com.uplus.eureka.candidate.model.service;

import com.uplus.eureka.candidate.model.dto.Candidate;
import com.uplus.eureka.candidate.model.dao.CandidateDao;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CandidateServiceImp implements CandidateService {

    private final CandidateDao candidateDao;

    // CandidateDao를 생성자 주입
    public CandidateServiceImp(CandidateDao candidateDao) {
        this.candidateDao = candidateDao;
    }

    // CandidateService 인터페이스에서 요구하는 getCandidates 메서드 구현
    @Override
    public List<Candidate> getCandidates(int pollId) {
        // CandidateDao의 getCandidates 메서드를 호출하여 pollId에 맞는 후보들 가져오기
        return candidateDao.getCandidates(pollId);
    }
}

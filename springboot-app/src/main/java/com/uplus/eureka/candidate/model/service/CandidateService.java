package com.uplus.eureka.candidate.model.service;

import com.uplus.eureka.candidate.model.dto.Candidate;
import java.util.List;

public interface CandidateService {
    List<Candidate> getCandidates(int pollId);
}

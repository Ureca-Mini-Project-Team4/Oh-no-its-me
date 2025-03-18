package com.uplus.eureka.candidate.model.dao;

import com.uplus.eureka.candidate.model.dto.Candidate;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CandidateDao {
    List<Candidate> getCandidates(int pollId);
}

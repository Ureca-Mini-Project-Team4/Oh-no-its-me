package com.uplus.eureka.vote.model.dao;

import com.uplus.eureka.vote.model.dto.VoteResult;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface VoteDao {
    VoteResult.Result findTopCandidateByPollId(@Param("pollId") int pollId);
    String findQuestionTextByPollId(@Param("pollId") int pollId);

    //투표 수 증가
    int incrementVoteCount(@Param("candidateId") int candidateId);
}

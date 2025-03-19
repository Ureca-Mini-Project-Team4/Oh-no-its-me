package com.uplus.eureka.vote.model.dao;

import com.uplus.eureka.vote.model.dto.VoteResult;
import com.uplus.eureka.vote.model.dto.VoteRequest;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface VoteDao {
    //특정 투표 결과 조회
    VoteResult.Result findTopCandidateByPollId(@Param("pollId") int pollId);
    String findQuestionTextByPollId(@Param("pollId") int pollId);

    //투표 수 증가
    int incrementVoteCount(VoteRequest voteRequest);

    //투표 완료 등록
    int completeVote(@Param("userId") int userId);
}

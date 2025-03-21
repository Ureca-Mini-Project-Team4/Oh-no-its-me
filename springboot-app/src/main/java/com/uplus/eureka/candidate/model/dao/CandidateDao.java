package com.uplus.eureka.candidate.model.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface CandidateDao {

    // poll_id가 높은 순으로 4개를 가져오는 쿼리
    List<Integer> getTopPollIds(int limit);

    // 특정 poll_id에 대해 is_selected가 false인 사용자 4명을 랜덤으로 가져오는 쿼리
    List<Integer> getRandomUsersForPoll(@Param("pollId") int pollId, @Param("limit") int limit);

    // candidates 테이블에 후보자를 추가하는 쿼리
    void insertCandidate(@Param("userId") int userId, @Param("pollId") int pollId);

    // user_id에 해당하는 is_selected 값을 true로 업데이트하는 쿼리
    void updateUserSelectedStatus(int userId);
}


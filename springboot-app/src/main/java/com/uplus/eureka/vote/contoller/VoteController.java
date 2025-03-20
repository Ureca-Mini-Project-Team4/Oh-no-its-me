package com.uplus.eureka.vote.contoller;

import com.uplus.eureka.vote.model.dto.VoteResult;
import com.uplus.eureka.vote.model.dto.VoteRequest;
import com.uplus.eureka.vote.model.service.VoteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Vote Management API", description = "투표 API")
@RestController
@RequestMapping("/api/vote")
public class VoteController {

    private final VoteService voteService;

    @Autowired
    public VoteController(VoteService voteService) {
        this.voteService = voteService;
    }

    // 특정 투표 결과 조회
    @Operation(summary = "특정 투표 결과 조회", description = "주제(pollId)마다 투표 결과를 조회")
    @ApiResponse(responseCode = "200", description = "투표 결과 조회 성공")
    @ApiResponse(responseCode = "400", description = "잘못된 요청, pollId가 잘못됨")
    @GetMapping("/{pollId}")
    public ResponseEntity<VoteResult> getVoteResult(@PathVariable("pollId") int pollId) {
        return ResponseEntity.ok(voteService.getVoteResult(pollId));
    }

    //투표 수 증가
    @Operation(summary = "투표 수 증가", description = "해당 후보자의 투표 수 증가")
    @ApiResponse(responseCode = "200", description = "투표 수 증가 성공")
    @ApiResponse(responseCode = "400", description = "잘못된 요청, pollId 또는 candidate_id가 잘못됨")
    @PostMapping("/{pollId}")
    public ResponseEntity<?> increaseVote(@PathVariable int pollId,
                                          @RequestBody VoteRequest voteRequest) {
        voteService.increaseVoteCount(pollId, voteRequest);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "투표 완료 등록", description = "유저의 투표 완료 등록")
    @ApiResponse(responseCode = "200", description = "투표 완료 등록 성공")
    @ApiResponse(responseCode = "400", description = "잘못된 요청, 유저가 존재하지 않거나 이미 투표 완료됨")
    @PostMapping("/{userId}/complete")
    public ResponseEntity<?> completeVote(@PathVariable int userId) {
        voteService.completeVote(userId);
        return ResponseEntity.ok().body("{\"message\": \"투표 완료 성공\"}");
    }

}


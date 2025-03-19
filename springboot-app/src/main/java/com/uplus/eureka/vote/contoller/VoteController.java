package com.uplus.eureka.vote.contoller;

import com.uplus.eureka.user.model.dto.User;
import com.uplus.eureka.user.model.dto.UserException;
import com.uplus.eureka.vote.model.dto.VoteResult;
import com.uplus.eureka.vote.model.dto.VoteRequest;
import com.uplus.eureka.vote.model.service.VoteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/vote")
public class VoteController {

    private final VoteService voteService;

    @Autowired
    public VoteController(VoteService voteService) {
        this.voteService = voteService;
    }

    // 특정 투표 결과 조회
    @GetMapping("/{pollId}")
    public ResponseEntity<?> getVoteResult(@PathVariable("pollId") int pollId) {
        try {
            VoteResult result = voteService.getVoteResult(pollId);
            return ResponseEntity.ok(result); // 200 OK
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage()); // 404 NOT FOUND
        }
    }

    //투표 수 증가
    @PostMapping("/{pollId}")
    public ResponseEntity<?> increaseVote(@PathVariable int pollId,
                                          @RequestBody VoteRequest voteRequest) {
        try {
            voteService.increaseVoteCount(pollId, voteRequest);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Mark Vote as Completed", description = "유저의 투표 완료 등록")
    @ApiResponse(responseCode = "200", description = "투표 완료 등록 성공")
    @ApiResponse(responseCode = "400", description = "잘못된 요청 (유저가 존재하지 않거나 이미 투표 완료됨)")
    @PostMapping("/{userId}/complete")
    public ResponseEntity<?> completeVote(@PathVariable int userId) {
        boolean success = voteService.completeVote(userId);

        if (success) {
            return ResponseEntity.ok().body("{\"message\": \"투표 완료 성공\"}");
        } else {
            return ResponseEntity.badRequest().body("{\"message\": \"유저가 존재하지 않거나 이미 투표 완료됨\"}");
        }
    }

}


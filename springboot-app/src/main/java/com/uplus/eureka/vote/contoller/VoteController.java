package com.uplus.eureka.vote.contoller;

import com.uplus.eureka.vote.model.dto.VoteResult;
import com.uplus.eureka.vote.model.dto.VoteRequest;
import com.uplus.eureka.vote.model.service.VoteService;
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

    @PostMapping("/{pollId}")
    public ResponseEntity<?> incrementVote(@PathVariable int pollId,
                                           @RequestBody VoteRequest voteRequest) {
        try {
            voteService.increaseVoteCount(voteRequest.getCandidateId());
            return ResponseEntity.ok().build(); // 성공 시 200 OK
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage()); // 실패 시 400 Bad Request
        }
    }

}


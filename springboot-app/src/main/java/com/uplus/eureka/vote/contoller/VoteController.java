package com.uplus.eureka.vote.contoller;

import com.uplus.eureka.vote.model.dto.VoteResult;
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
    public ResponseEntity<?> getVoteResult(@PathVariable int pollId) {
        try {
            VoteResult result = voteService.getVoteResult(pollId);
            return ResponseEntity.ok(result); // 200 OK
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage()); // 404 NOT FOUND
        }
    }
}


package com.uplus.eureka.comment.controller;

import com.uplus.eureka.comment.model.dto.Comment;
import com.uplus.eureka.comment.model.dto.CommentDeleteRequest;
import com.uplus.eureka.comment.model.dto.CommentRequest;
import com.uplus.eureka.comment.model.service.CommentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Tag(name = "Comment Management API", description = "댓글 관리 API")
@RestController
@RequestMapping("/api/comment")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @Operation(summary = "전체 댓글 조회", description = "전체 댓글 조회하기")
    @ApiResponse(responseCode = "200", description = "모든 댓글 조회 성공")
    @GetMapping
    public ResponseEntity<?> getAllComments() {
        List<Comment> comments = commentService.getAllComments();
        if(comments.isEmpty()) {
            return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(comments, HttpStatus.OK);
    }

    @Operation(summary = "특정 댓글 조회", description = "commentID로 특정 댓글 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "댓글 조회 성공"),
            @ApiResponse(responseCode = "404", description = "댓글을 찾을 수 없음")
    })
    @GetMapping("/{commentId}")
    public ResponseEntity<Comment> getCommentById(@PathVariable("commentId") Integer commentId) {
        Comment comment = commentService.getCommentById(commentId);
        return new ResponseEntity<>(comment, HttpStatus.OK);
    }

    @Operation(summary = "댓글 생성", description = "새로운 댓글 작성")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "댓글 등록 성공"),
            @ApiResponse(responseCode = "401", description = "등록되지 않은 사용자 에러")
    })
    @PostMapping
    public ResponseEntity<String> insertComment(@RequestBody CommentRequest comment) {
        System.out.println(comment);
        if(comment.getUserId() == null){
            return new ResponseEntity<String>("FAILED", HttpStatus.BAD_REQUEST);
        }
        commentService.insertComment(comment);
        return new ResponseEntity<String>("SUCCESS", HttpStatus.CREATED);
    }

    @Operation(summary = "댓글 수정", description = "본인이 작성한 댓글 수정")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "댓글 수정 성공"),
            @ApiResponse(responseCode = "401", description = "등록되지 않은 사용자 에러")
    })
    @PatchMapping("/{commentId}")
    public ResponseEntity<String> updateComment(
            @PathVariable("commentId") Integer commentId,
            @RequestBody CommentRequest commentRequest) {

        // 서비스 호출
        commentService.updateComment(commentId,commentRequest);

        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<String> deleteCommentById(
            @PathVariable("commentId") Integer commentId,
            @RequestBody CommentDeleteRequest commentDeleteRequest) {

        commentService.deleteCommentById(commentId, commentDeleteRequest); // Call service to delete the comment
        return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
    }

}

package com.uplus.eureka.vote.model.dto;

import lombok.Data;
import java.util.List;

@Data
public class VoteResult {
    private int pollId;
    private String questionText;
    private String icon;
    private List<Result> results;

    @Data
    public static class Result {
        private String username;
        private int voteCount;
    }
    
    @Data
    public static class Question {
    	public String questionText;
    	public String icon;
    }

}

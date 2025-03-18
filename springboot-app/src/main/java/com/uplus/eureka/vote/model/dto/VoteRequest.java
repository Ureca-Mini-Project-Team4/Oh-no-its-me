package com.uplus.eureka.vote.model.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class VoteRequest {
    private int candidate_id;
}

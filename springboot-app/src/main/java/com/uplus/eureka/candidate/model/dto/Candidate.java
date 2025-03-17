package com.uplus.eureka.candidate.model.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonIgnore;


@Data
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)  // null 값은 JSON에 포함되지 않도록
public class Candidate {
	
    @JsonIgnore  // candidate_id 필드를 JSON에 포함하지 않음
    @JsonProperty("candidate_id")  // 필드 이름을 JSON 키로 사용
    private int candidateId;

    @JsonProperty("poll_id")
    private int pollId;
    
    @JsonProperty("user_id")
    private int userId;

    @JsonProperty("vote_count")
    private int voteCount;
}



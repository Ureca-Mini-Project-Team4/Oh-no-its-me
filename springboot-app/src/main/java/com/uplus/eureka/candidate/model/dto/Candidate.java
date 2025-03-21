package com.uplus.eureka.candidate.model.dto;

public class Candidate {

    private int candidateId;
    private int userId;
    private int pollId;
    private int voteCount;

    public Candidate() {}

    public Candidate(int userId, int pollId, int voteCount) {
        this.userId = userId;
        this.pollId = pollId;
        this.voteCount = voteCount;
    }

    public int getCandidateId() {
        return candidateId;
    }

    public void setCandidateId(int candidateId) {
        this.candidateId = candidateId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getPollId() {
        return pollId;
    }

    public void setPollId(int pollId) {
        this.pollId = pollId;
    }

    public int getVoteCount() {
        return voteCount;
    }

    public void setVoteCount(int voteCount) {
        this.voteCount = voteCount;
    }

    @Override
    public String toString() {
        return "Candidate{" +
               "candidateId=" + candidateId +
               ", userId=" + userId +
               ", pollId=" + pollId +
               ", voteCount=" + voteCount +
               '}';
    }
}

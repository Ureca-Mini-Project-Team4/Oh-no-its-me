package com.uplus.eureka.poll.model.dto;

import java.time.LocalDateTime;

public class Question {
    private int questionId;    // question_id 필드와 매핑
    private String questionText;  // question_text 필드와 매핑
    private LocalDateTime startTime;  // 시작 시간
    private LocalDateTime endTime;  // 종료 시간

    // 기본 생성자
    public Question() {}

    // 매개변수 있는 생성자
    public Question(int questionId, String questionText) {
        this.questionId = questionId;
        this.questionText = questionText;
    }

    // Getter and Setter
    public int getQuestionId() {
        return questionId;
    }

    public void setQuestionId(int questionId) {
        this.questionId = questionId;
    }

    public String getQuestionText() {
        return questionText;
    }

    public void setQuestionText(String questionText) {
        this.questionText = questionText;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

    @Override
    public String toString() {
        return "Question{" +
                "questionId=" + questionId +
                ", questionText='" + questionText + '\'' +
                ", startTime=" + startTime +
                ", endTime=" + endTime +
                '}';
    }
}

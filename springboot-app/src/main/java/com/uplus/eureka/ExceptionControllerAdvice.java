package com.uplus.eureka;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;


@ControllerAdvice(annotations = RestController.class)
public class ExceptionControllerAdvice {
	private Logger logger = LoggerFactory.getLogger(getClass());


	@ExceptionHandler
	public ResponseEntity<String> handler(Exception e) {
		logger.error("msg: {}", e.getMessage(), e);  // 예외와 stack trace를 함께 기록


		HttpHeaders resheader = new HttpHeaders();
		resheader.add("Content-Type", "application/json;charset-UTF-8");

		String msg = "처리 중 오류 발생"; // "An error occurred during processing"
		if (e instanceof EurekaException) {
			msg = e.getMessage();
		}
		return new ResponseEntity<String>(msg, resheader, HttpStatus.INTERNAL_SERVER_ERROR);
	}
}
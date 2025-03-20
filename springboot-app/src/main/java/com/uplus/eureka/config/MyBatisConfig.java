package com.uplus.eureka.config;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@MapperScan("com.uplus.eureka.candidate.model.dao") // CandidateDao 패키지 스캔
public class MyBatisConfig {
}

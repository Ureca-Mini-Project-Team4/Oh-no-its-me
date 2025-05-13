package com.uplus.eureka;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.scheduling.annotation.EnableScheduling;

//@SpringBootApplication
@SpringBootApplication(exclude ={SecurityAutoConfiguration.class} )
@EnableScheduling
public class SpringBootTestApplication {
	public static void main(String[] args) {
		SpringApplication.run(SpringBootTestApplication.class, args);
	}

}

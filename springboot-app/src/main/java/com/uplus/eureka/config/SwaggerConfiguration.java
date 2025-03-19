package com.uplus.eureka.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfiguration {
	private Logger logger = LoggerFactory.getLogger(getClass());

	public SwaggerConfiguration() {
		logger.debug("SwaggerConfiguration.................");
	}

	@Bean
	public OpenAPI openEurekaAPI() {
		logger.debug("openEurekaAPI.............");
		Info info = new Info().title("너로 정했다 API 명세서").description(
						"<h3>Oh-no-its-me API Reference for Developers</h3>Swagger를 이용한 너로 정했다! 프로젝트 API 문서입니다.<br><img src=\"/eureka/assets/img/logo.png\" width=\"100\">")
				.version("v1");

		return new OpenAPI().components(new Components()).info(info);
	}

	@Bean
	public GroupedOpenApi allApi() {
		return GroupedOpenApi.builder()
				.group("all")
				.pathsToMatch("/api/**")
				.build();
	}
}
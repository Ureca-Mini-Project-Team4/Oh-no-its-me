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
		Info info = new Info().title("SpringTest API 명세서").description(
						"<h3>SpringTest API Reference for Developers</h3>Swagger를 이용한 SpringTest API<br><img src=\"/eureka/assets/img/eureka_logo.png\" width=\"50\">")
				.version("v1");

		return new OpenAPI().components(new Components()).info(info);
	}

	@Bean
	public GroupedOpenApi userApi() {
		return GroupedOpenApi.builder()
				.group("user")
				.pathsToMatch("/api/user/**")
				.build();
	}
}
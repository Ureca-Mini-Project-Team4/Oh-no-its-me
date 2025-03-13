package com.uplus.eureka.config;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableAspectJAutoProxy
@MapperScan(basePackages = { "com.uplus.**.dao" })
public class WebMvcConfiguration implements WebMvcConfigurer {

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
				.allowedOrigins("*") // 모든 출처 허용 (환경에 따라 조정할 것)
				.allowedMethods(HttpMethod.GET.name(), HttpMethod.POST.name(),
						HttpMethod.PUT.name(), HttpMethod.DELETE.name(),
						HttpMethod.HEAD.name(), HttpMethod.OPTIONS.name(),
						HttpMethod.PATCH.name())
				.maxAge(1800); // Preflight 결과를 1800초 동안 캐시
	}

	@Override
	public void addViewControllers(ViewControllerRegistry registry) {
		registry.addViewController("/").setViewName("index2");
	}

	// 필요한 경우 주석 해제하여 자원 핸들러 추가
	// @Override
	// public void addResourceHandlers(ResourceHandlerRegistry registry) {
	//     registry.addResourceHandler("/upload/file/**")
	//             .addResourceLocations("file:///" + uploadFilePath + "/")
	//             .setCachePeriod(3600)
	//             .resourceChain(true)
	//             .addResolver(new PathResourceResolver());
	// }
}

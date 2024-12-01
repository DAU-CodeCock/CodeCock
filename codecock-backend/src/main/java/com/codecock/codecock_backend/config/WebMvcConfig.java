package com.codecock.codecock_backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class WebMvcConfig {

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedOrigin("http://localhost:5173"); // 허용할 도메인 (React 앱의 주소)
        config.addAllowedMethod("*"); // 모든 HTTP 메서드 허용
        config.addAllowedHeader("*"); // 모든 헤더 허용
        config.setAllowCredentials(true); // 인증 정보 포함 허용 (예: 쿠키)

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config); // 모든 경로에 대해 CORS 설정 적용
        return new CorsFilter(source);
    }
}

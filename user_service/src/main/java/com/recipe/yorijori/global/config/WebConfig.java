//package com.recipe.yorijori.global.config;
//
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.servlet.config.annotation.CorsRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//
//@Configuration
//public class WebConfig implements WebMvcConfigurer {
//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//        registry.addMapping("/**")
//                .allowedOriginPatterns("https://j11c206.p.ssafy.io/", "http://localhost:5173","http://j11c206a.p.ssafy.io/")
//                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH")
//                .allowedHeaders("*")
//                .allowCredentials(true); // 쿠키 인증 요청 허용
//    }
//}

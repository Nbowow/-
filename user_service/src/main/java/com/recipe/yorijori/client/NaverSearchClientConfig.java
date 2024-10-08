package com.egginhealth.config;

import feign.RequestInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;


@RequiredArgsConstructor
public class NaverSearchClientConfig {

    @Bean
    public RequestInterceptor requestInterceptor(@Value("${ocr.api.key}") String apiKey) {
        return requestTemplate -> {
            requestTemplate.header("X-Naver-Client-Id", "w8faWtah0sxEHtDEV7MI");
            requestTemplate.header("X-Naver-Client-Secret", "ShhHCY1D9I");
        };
    }


}

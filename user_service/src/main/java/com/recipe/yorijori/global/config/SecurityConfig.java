package com.recipe.yorijori.global.config;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.recipe.yorijori.global.filter.CustomJsonUsernamePasswordAuthenticationFilter;
import com.recipe.yorijori.global.filter.JwtAuthenticationProcessingFilter;
import com.recipe.yorijori.global.handler.LoginFailureHandler;
import com.recipe.yorijori.global.handler.LoginSuccessHandler;
import com.recipe.yorijori.global.handler.OAuth2LoginFailureHandler;
import com.recipe.yorijori.global.handler.OAuth2LoginSuccessHandler;
import com.recipe.yorijori.repository.UserRepository;
import com.recipe.yorijori.service.CustomOAuth2UserService;
import com.recipe.yorijori.service.JwtService;
import com.recipe.yorijori.service.LoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

import static org.springframework.security.config.Customizer.withDefaults;


/**
 * 인증은 CustomJsonUsernamePasswordAuthenticationFilter에서 authenticate()로 인증된 사용자로 처리
 * JwtAuthenticationProcessingFilter는 AccessToken, RefreshToken 재발급
 */
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final LoginService loginService;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final ObjectMapper objectMapper;
    private final OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler;
    private final OAuth2LoginFailureHandler oAuth2LoginFailureHandler;
    private final CustomOAuth2UserService customOAuth2UserService;


    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.setAllowedOrigins(
                List.of("https://j11c206.p.ssafy.io", "http://localhost:5173", "http://j11c206a.p.ssafy.io")
        );
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setExposedHeaders(List.of("Authorization", "Content-Type"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource())) // CORS 설정 적용

                // CSRF 비활성화
                .csrf(csrf -> csrf.disable()) // Stateless 애플리케이션에서 CSRF 보호 비활성화

                // 세션 관리 설정: 세션을 사용하지 않고, STATELESS 모드로 설정
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                // 헤더 설정
                .headers(headers -> headers.frameOptions(frameOptions -> frameOptions.disable())) // H2 콘솔을 사용하기 위해 frameOptions 비활성화

                // URL별 권한 관리
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/", "/index.html","/css/**", "/images/**", "/js/**", "/favicon.ico", "/h2-console/**").permitAll() // 공용 자원에 대한 접근 허용
                        .requestMatchers("/api/v1/users/sign-up").permitAll() // 회원가입 페이지 접근 허용
                        .requestMatchers("/api/v1/home").permitAll() // /home 경로도 인증 없이 접근 허용
                        .anyRequest().authenticated() // 그 외 모든 요청은 인증된 사용자만 접근 가능

                )

                // 소셜 로그인 설정
                .oauth2Login(oauth2 -> oauth2
                        .loginPage("http://j11c206.p.ssafy.io:8081/oauth2/authorization/naver")  // 커스텀 로그인 페이지 경로 설정
                        .successHandler(oAuth2LoginSuccessHandler) // 로그인 성공 핸들러
                        .failureHandler(oAuth2LoginFailureHandler) // 로그인 실패 핸들러
                        .userInfoEndpoint(userInfo -> userInfo.userService(customOAuth2UserService)) // userInfoEndpoint 대신 userService 설정
                );

        // 커스텀 필터 추가 (Jwt 및 Custom JSON 로그인 필터)
        http.addFilterAfter(customJsonUsernamePasswordAuthenticationFilter(), LogoutFilter.class);
        http.addFilterBefore(jwtAuthenticationProcessingFilter(), CustomJsonUsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    /**
     * AuthenticationManager 설정 후 등록
     * PasswordEncoder를 사용하는 AuthenticationProvider 지정 (PasswordEncoder는 위에서 등록한 PasswordEncoder 사용)
     * FormLogin(기존 스프링 시큐리티 로그인)과 동일하게 DaoAuthenticationProvider 사용
     * UserDetailsService는 커스텀 LoginService로 등록
     * 또한, FormLogin과 동일하게 AuthenticationManager로는 구현체인 ProviderManager 사용(return ProviderManager)
     *
     */
    @Bean
    public AuthenticationManager authenticationManager() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(passwordEncoder());
        provider.setUserDetailsService(loginService);
        return new ProviderManager(provider);
    }

    /**
     * 로그인 성공 시 호출되는 LoginSuccessJWTProviderHandler 빈 등록
     */
    @Bean
    public LoginSuccessHandler loginSuccessHandler() {
        return new LoginSuccessHandler(jwtService, userRepository);
    }

    /**
     * 로그인 실패 시 호출되는 LoginFailureHandler 빈 등록
     */
    @Bean
    public LoginFailureHandler loginFailureHandler() {
        return new LoginFailureHandler();
    }

    /**
     * CustomJsonUsernamePasswordAuthenticationFilter 빈 등록
     * 커스텀 필터를 사용하기 위해 만든 커스텀 필터를 Bean으로 등록
     * setAuthenticationManager(authenticationManager())로 위에서 등록한 AuthenticationManager(ProviderManager) 설정
     * 로그인 성공 시 호출할 handler, 실패 시 호출할 handler로 위에서 등록한 handler 설정
     */
    @Bean
    public CustomJsonUsernamePasswordAuthenticationFilter customJsonUsernamePasswordAuthenticationFilter() {
        CustomJsonUsernamePasswordAuthenticationFilter customJsonUsernamePasswordLoginFilter
                = new CustomJsonUsernamePasswordAuthenticationFilter(objectMapper);
        customJsonUsernamePasswordLoginFilter.setAuthenticationManager(authenticationManager());
        customJsonUsernamePasswordLoginFilter.setAuthenticationSuccessHandler(loginSuccessHandler());
        customJsonUsernamePasswordLoginFilter.setAuthenticationFailureHandler(loginFailureHandler());
        return customJsonUsernamePasswordLoginFilter;
    }

    @Bean
    public JwtAuthenticationProcessingFilter jwtAuthenticationProcessingFilter() {
        JwtAuthenticationProcessingFilter jwtAuthenticationFilter = new JwtAuthenticationProcessingFilter(jwtService, userRepository);
        return jwtAuthenticationFilter;
    }
}


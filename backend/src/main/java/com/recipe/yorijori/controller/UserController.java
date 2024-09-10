package com.recipe.yorijori.controller;

import com.recipe.yorijori.data.dto.user.request.UserSignUpDto;
import com.recipe.yorijori.data.dto.user.response.UserResponseDto;
import com.recipe.yorijori.service.JwtService;
import com.recipe.yorijori.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final JwtService jwtService;

    @PostMapping("/sign-up")
    public String signUp(@RequestBody UserSignUpDto userSignUpDto) throws Exception {
        userService.signUp(userSignUpDto);
        return "회원가입 성공";
    }

    @GetMapping("/jwt-test")
    public String jwtTest() {
        return "jwtTest 요청 성공";
    }

    @GetMapping("/api/user")
    public ResponseEntity<UserResponseDto> getUserInfo(HttpServletRequest request) {
        // 요청 헤더에서 AccessToken 추출
        String accessToken = jwtService.extractAccessToken(request)
                .orElseThrow(() -> new IllegalArgumentException("AccessToken이 존재하지 않습니다."));

        // AccessToken에서 사용자 이메일 추출
        String userEmail = jwtService.extractEmail(accessToken)
                .orElseThrow(() -> new IllegalArgumentException("유효하지 않은 AccessToken입니다."));

        // 이메일로 사용자 정보 조회
        UserResponseDto userDto = userService.getUserByEmail(userEmail);

        // 사용자 정보 응답
        return ResponseEntity.ok(userDto);
    }
}

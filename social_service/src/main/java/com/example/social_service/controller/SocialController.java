package com.example.social_service.controller;

import com.example.social_service.data.dto.user.UserResponseDto;
import com.example.social_service.service.SocialService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/social")
public class SocialController {

    private final SocialService socialService;

    @GetMapping("/test")
    public ResponseEntity<?> welcome() {
        return ResponseEntity.status(HttpStatus.OK).body("Welcome to Social Service!");
    }

    @GetMapping("/user/{nickname}")
    public ResponseEntity<?> getUser(@PathVariable String nickname) {

        UserResponseDto userResponseDto = socialService.findUserByUserNickname(nickname);

        return ResponseEntity.status(HttpStatus.OK).body(userResponseDto);
    }
}

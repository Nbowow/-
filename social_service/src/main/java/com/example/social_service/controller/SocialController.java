package com.example.social_service.controller;

import com.example.social_service.data.dto.user.UserResponseDto;
import com.example.social_service.service.SocialService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/social")
public class SocialController {

    private final SocialService socialService;

    @GetMapping("/{nickname}")
    public ResponseEntity<?> getUser(@PathVariable String nickname) {

        UserResponseDto userResponseDto = socialService.findUserByUserNickname(nickname);

        return ResponseEntity.status(HttpStatus.OK).body(userResponseDto);
    }
}

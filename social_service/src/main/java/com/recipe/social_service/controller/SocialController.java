package com.recipe.social_service.controller;

import com.recipe.social_service.data.dto.user.response.FollowerResponseDto;
import com.recipe.social_service.data.dto.user.response.FollowingResponseDto;
import com.recipe.social_service.data.dto.user.response.UserResponseDto;
import com.recipe.social_service.service.SocialService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/api/v1/social/{nickname}/follower")
    public List<FollowerResponseDto> getFollowers(@PathVariable String nickname){
        return List.of();
    }

    @GetMapping("/api/v1/social/{nickname}/following")
    List<FollowingResponseDto> getFollowings(@PathVariable String nickname){
        return List.of();
    }
}

package com.recipe.social_service.controller;

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

    // 팔로워 목록 조회
    @GetMapping("/{userId}/follower")
    public ResponseEntity<List<Long>> getFollowers(@PathVariable Long userId) {
        List<Long> followers = socialService.getFollowers(userId);
        return ResponseEntity.status(HttpStatus.OK).body(followers);
    }

    // 팔로잉 목록 조회
    @GetMapping("/{userId}/following")
    public ResponseEntity<List<Long>> getFollowings(@PathVariable Long userId) {
        List<Long> followings = socialService.getFollowings(userId);
        return ResponseEntity.status(HttpStatus.OK).body(followings);
    }
}

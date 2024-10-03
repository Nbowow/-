package com.recipe.social_service.service;

import com.recipe.social_service.client.UserServiceClient;
import com.recipe.social_service.repository.SocialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class SocialService {

    private final SocialRepository socialRepository;

    // 팔로워 목록 조회
    public List<Long> getFollowers(Long userId) {
        // 사용자가 팔로우하는 다른 사람들의 ID 목록을 가져옴
        return socialRepository.findByFollowingId(userId);
    }

    // 팔로잉 목록 조회
    public List<Long> getFollowings(Long userId) {
        // 사용자를 팔로우하는 사람들의 ID 목록을 가져옴
        return socialRepository.findByFollowerId(userId);
    }
}

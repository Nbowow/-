package com.recipe.social_service.service;

import com.recipe.social_service.client.UserServiceClient;
import com.recipe.social_service.data.domain.Follow;
import com.recipe.social_service.data.dto.user.response.FollowerResponseDto;
import com.recipe.social_service.data.dto.user.response.FollowingResponseDto;
import com.recipe.social_service.data.dto.user.response.UserResponseDto;
import com.recipe.social_service.data.dto.user.response.UserResponseDto2;
import com.recipe.social_service.repository.SocialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class SocialService {

    private final SocialRepository socialRepository;
    private final UserServiceClient userServiceClient;  // UserServiceClient 주입

    // 팔로워 목록 조회
    public List<FollowerResponseDto> getFollowers(Long userId) {
        return socialRepository.findByFollowingId(userId).stream()
                .map(follow -> {
                    // followerId로 사용자 정보 조회
                    UserResponseDto2 user = userServiceClient.getUserImage(follow.getFollowerId());
                    return new FollowerResponseDto(
                            follow.getFollowerId(),
                            user.getNickname(),
                            user.getProfileImage());
                })
                .collect(Collectors.toList());
    }

    // 팔로잉 목록 조회
    public List<FollowingResponseDto> getFollowings(Long userId) {
        return socialRepository.findByFollowerId(userId).stream()
                .map(follow -> {
                    // followingId로 사용자 정보 조회
                    UserResponseDto2 user = userServiceClient.getUserImage(follow.getFollowingId());
                    return new FollowingResponseDto(
                            follow.getFollowingId(),
                            user.getNickname(),
                            user.getProfileImage());
                })
                .collect(Collectors.toList());
    }
}

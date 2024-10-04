package com.recipe.social_service.service;

import com.recipe.social_service.client.UserServiceClient;
import com.recipe.social_service.data.domain.Follow;
import com.recipe.social_service.repository.SocialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class SocialService {

    private final SocialRepository socialRepository;


    public List<Long> getFollowers(Long userId) {
        return socialRepository.findFollowerIdsByFollowingId(userId);
    }


    public List<Long> getFollowings(Long userId) {
        return socialRepository.findFollowingIdsByFollowerId(userId);
    }


    // Follow a user
    public void followUser(Long followerId, Long followingId) {
        Follow follow = Follow.builder()
                .followerId(followerId)
                .followingId(followingId)
                .followerStatus(true)  // optional: assume true by default
                .followingStatus(true) // optional: assume true by default
                .build();
        socialRepository.save(follow);
    }

    // Unfollow a user
    public void unfollowUser(Long followerId, Long followingId) {
        Follow follow = socialRepository.findByFollowerIdAndFollowingId(followerId, followingId);
        if (follow != null) {
            socialRepository.delete(follow);
        }
    }
}

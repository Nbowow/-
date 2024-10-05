package com.recipe.social_service.repository;

import com.recipe.social_service.data.domain.Follow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface SocialRepository extends JpaRepository<Follow, Long> {

    // 팔로워 ID 목록 조회
    @Query("SELECT f.followerId FROM Follow f WHERE f.followingId = :userId")
    List<Long> findFollowerIdsByFollowingId(@Param("userId") Long userId);

    // 팔로잉 ID 목록 조회
    @Query("SELECT f.followingId FROM Follow f WHERE f.followerId = :userId")
    List<Long> findFollowingIdsByFollowerId(@Param("userId") Long userId);


    // Find follow relationship by follower and following IDs
    Follow findByFollowerIdAndFollowingId(Long followerId, Long followingId);
}
package com.recipe.social_service.repository;

import com.recipe.social_service.data.domain.Follow;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface SocialRepository extends JpaRepository<Follow, Long> {

    // 팔로워 목록 조회
    List<Long> findByFollowingId(Long userId);

    // 팔로잉 목록 조회
    List<Long> findByFollowerId(Long userId);
}
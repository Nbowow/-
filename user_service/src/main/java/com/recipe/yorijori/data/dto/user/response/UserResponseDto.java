package com.recipe.yorijori.data.dto.user.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDto {
    private long id;
    private String email;
    private String nickname;
    private String profileImage;
    private String name;
    private String summary; // 회원 한줄 소개

    private List<FollowerResponseDto> followers;
    private List<FollowingResponseDto> followings;
}
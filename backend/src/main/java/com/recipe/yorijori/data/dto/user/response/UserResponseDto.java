package com.recipe.yorijori.data.dto.user.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDto {
    private String email;
    private String nickname;
    private String profileImage;
    private String gender;
    private String age;
    private String name;
    private String birthday;
}
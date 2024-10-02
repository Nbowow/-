package com.recipe.social_service.data.dto.user;

import com.recipe.social_service.data.dto.recipe.RecipeResponseDto;
import lombok.Data;

import java.util.List;

@Data
public class UserResponseDto {

    private String email;
    private String nickname;
    private String profileImage;
    private String name;

    private List<RecipeResponseDto> recipes;
}

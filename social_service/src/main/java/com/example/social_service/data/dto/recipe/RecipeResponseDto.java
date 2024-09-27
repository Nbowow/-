package com.example.social_service.data.dto.recipe;

import lombok.Data;

@Data
public class RecipeResponseDto {
    private String title;
    private String name;
    private String info;
    private Long userId;
}

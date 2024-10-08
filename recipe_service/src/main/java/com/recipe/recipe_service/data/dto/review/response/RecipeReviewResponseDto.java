package com.recipe.recipe_service.data.dto.review.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RecipeReviewResponseDto {
    private Long userId;
    private String nickname;
    private String profileImage;
    private Long rating;
    private String title;
    private String content;
}

package com.recipe.recipe_service.data.dto.review.request;

import lombok.Data;

@Data
public class RecipeReviewRequestDto {
    private Long userId;
    private String nickname;
    private String profileImage;
    private String reviewImage; // 리뷰 이미지
    private Long rating;
    private String title;
    private String content;
}

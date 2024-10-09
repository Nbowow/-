package com.recipe.yorijori.data.dto.rank;

import lombok.Data;

@Data
public class RankResponseDto {
    private String nickname;
    private String image;
    private Long score;

    private Long recipeCount;
    private Long likeCount;
}

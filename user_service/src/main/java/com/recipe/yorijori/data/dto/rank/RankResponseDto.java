package com.recipe.yorijori.data.dto.rank;

import lombok.Data;

@Data
public class RankResponseDto {
    private Long rank;
    private String nickname;
    private String image;
    private Long score;

    private Long recipeCount;
    private Long likeCount;
}

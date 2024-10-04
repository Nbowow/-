package com.recipe.yorijori.data.dto.rank;

import lombok.Data;

@Data
public class RankResponseDto {
    private String nickname;
    private String image;
    private Long score;

    private Long recipeCount; // 레시피 등록 수 (게시글 수)
    private Long likeCount; // 받은 좋아요 수
}

package com.recipe.yorijori.data.dto.allergy.response;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AllergyResponseDto {
    private Long allergyId;
    private boolean status;
    private String commonCodeNum;
    private Long userId;
}

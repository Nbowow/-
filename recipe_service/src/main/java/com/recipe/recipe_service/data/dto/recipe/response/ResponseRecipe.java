package com.recipe.recipe_service.data.dto.recipe.response;

import lombok.Data;

@Data
public class ResponseRecipe {
    private String title;
    private String name;
    private String info;
    private Long userId;
}

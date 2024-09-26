package com.example.recipe_service.data.dto.recipe;

import lombok.Data;

import java.io.Serializable;

@Data
public class RecipeDto implements Serializable {
    private String title;
    private String name;
    private String info;

    private Long userId;
}

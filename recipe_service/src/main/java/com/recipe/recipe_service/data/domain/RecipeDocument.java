package com.recipe.recipe_service.data.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

@Document(indexName = "recipes")
public class RecipeDocument {
    @Id
    private Long id;
    private String title;
    private String intro;
    private String name;
}

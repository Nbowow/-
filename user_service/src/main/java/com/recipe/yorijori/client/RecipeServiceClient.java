package com.recipe.yorijori.client;

import com.recipe.yorijori.data.dto.recipe.response.RecipeResponseDto;
import com.recipe.yorijori.data.dto.recipe.response.UserRecipeResponseDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "recipe-service")
public interface RecipeServiceClient {

    @GetMapping("/api/v1/recipe/{userId}/recipes")
    List<RecipeResponseDto> getRecipes(@PathVariable Long userId);
}

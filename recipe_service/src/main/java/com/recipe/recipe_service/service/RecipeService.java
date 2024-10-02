package com.recipe.recipe_service.service;

import com.recipe.recipe_service.data.domain.Recipe;
import com.recipe.recipe_service.data.dto.recipe.RecipeDto;
import com.recipe.recipe_service.repository.RecipeRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@AllArgsConstructor
public class RecipeService {

    private final RecipeRepository recipeRepository;

    public Recipe createRecipe(RecipeDto recipeDto) {
        // RecipeDto -> Recipe 엔티티
        log.info("RecipeDto : " + recipeDto.getTitle() + " " + recipeDto.getName() + " " + recipeDto.getInfo() + " " + recipeDto.getUserId());
        Recipe recipe = new Recipe();
        recipe.setTitle(recipeDto.getTitle());
        recipe.setName(recipeDto.getName());
        recipe.setInfo(recipeDto.getInfo());
        recipe.setUserId(recipeDto.getUserId());

        recipeRepository.save(recipe);
        log.info("Recipe created : " + recipe.getTitle() + " " + recipe.getName() + " " + recipe.getInfo());

        return recipe;
    }

    public Iterable<Recipe> getRecipesByUserEmail(Long userId) {
        return recipeRepository.findByUserId(userId);
    }
}
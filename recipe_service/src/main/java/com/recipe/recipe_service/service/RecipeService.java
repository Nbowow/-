package com.recipe.recipe_service.service;

import com.recipe.recipe_service.data.domain.Recipe;
import com.recipe.recipe_service.data.dto.recipe.RecipeDto;
import com.recipe.recipe_service.data.dto.recipe.request.RecipeRegisterRequestDto;
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
    private final ModelMapper modelMapper;

    public Recipe createRecipe(RecipeRegisterRequestDto createRecipeDto) {

        // DTO를 Recipe 엔티티로 변환
        Recipe recipeEntity = modelMapper.map(createRecipeDto, Recipe.class);

        // 변환된 엔티티를 저장
        return recipeRepository.save(recipeEntity);
    }

    public Iterable<Recipe> getRecipesByUserEmail(Long userId) {
        return recipeRepository.findByUserId(userId);
    }
}
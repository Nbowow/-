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

    public Recipe createRecipe(RecipeRegisterRequestDto createRecipeDto, Long userId) {

        // Builder 패턴을 사용하여 RecipeRegisterRequestDto 객체 생성
        Recipe recipeEntity = Recipe.builder()
                .userId(userId)  // userId를 설정
                .title(createRecipeDto.getTitle())  // 다른 값들을 그대로 사용
                .name(createRecipeDto.getName())
                .intro(createRecipeDto.getIntro())
                .image(createRecipeDto.getImage())
                .likeCount(0L)
                .viewCount(0L)
                .servings(createRecipeDto.getServings())
                .time(createRecipeDto.getTime())
                .level(createRecipeDto.getLevel())
                .cookingTools(createRecipeDto.getCookingTools())
                .type(createRecipeDto.getType())
                .situation(createRecipeDto.getSituation())
                .ingredients(createRecipeDto.getIngredients())
                .method(createRecipeDto.getMethod())
                .userStatus(true)  // 필요 시 기본값을 넣거나 그대로 사용
                .build();

        // 변환된 엔티티를 저장
        return recipeRepository.save(recipeEntity);
    }

    public Iterable<Recipe> getRecipesByUserEmail(Long userId) {
        return recipeRepository.findByUserId(userId);
    }
}
package com.recipe.recipe_service.service;

import com.recipe.recipe_service.data.domain.Recipe;
import com.recipe.recipe_service.data.dto.recipe.RecipeDto;
import com.recipe.recipe_service.data.dto.recipe.request.RecipeRegisterRequestDto;
import com.recipe.recipe_service.data.dto.recipe.response.ResponseRecipe;
import com.recipe.recipe_service.repository.RecipeRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public List<ResponseRecipe> getAllRecipes(int pageNumber, int pageSize) {
        // 페이지 요청을 생성하여 레시피를 페이징 처리
        Pageable pageable = PageRequest.of(pageNumber, pageSize);

        Page<Recipe> recipePage = recipeRepository.findAll(pageable);

        // 페이지 결과에서 데이터를 추출하여 DTO로 변환
        List<ResponseRecipe> recipeList = recipePage.getContent().stream()
                .map(recipe -> ResponseRecipe.builder()
                        .id(recipe.getId())
                        .title(recipe.getTitle())
                        .name(recipe.getName())
                        .intro(recipe.getIntro())
                        .image(recipe.getImage())
                        .viewCount(recipe.getViewCount())
                        .servings(recipe.getServings())
                        .time(recipe.getTime())
                        .level(recipe.getLevel())
                        .type(recipe.getType())
                        .situation(recipe.getSituation())
                        .ingredients(recipe.getIngredients())
                        .method(recipe.getMethod())
                        .userId(recipe.getUserId())
                        .likeCount(recipe.getLikeCount())
                        .scrapCount(recipe.getScrapCount())
                        .commentCount(recipe.getCommentCount())
                        .build())
                .toList();

        return recipeList;
    }

    public ResponseRecipe getRecipe(Long id) {

        return recipeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("해당 ID에 해당하는 레시피가 존재하지 않습니다."));
    }
}
package com.recipe.recipe_service.controller;

import com.recipe.recipe_service.client.IngredientServiceClient;
import com.recipe.recipe_service.client.UserServiceClient;
import com.recipe.recipe_service.data.domain.Recipe;
import com.recipe.recipe_service.data.domain.RecipeComments;
import com.recipe.recipe_service.data.dto.comment.request.CommentRegisterRequestDto;
import com.recipe.recipe_service.data.dto.comment.response.CommentResponseDto;
import com.recipe.recipe_service.data.dto.recipe.request.RecipeRegisterRequestDto;
import com.recipe.recipe_service.data.dto.recipe.response.RecipeDetailsResponseDto;
import com.recipe.recipe_service.data.dto.recipe.response.UserRecipeLikeResponseDto;
import com.recipe.recipe_service.data.dto.recipe.response.UserRecipeRegistResponseDto;
import com.recipe.recipe_service.data.dto.recipe.response.UserRecipeScrapResponseDto;
import com.recipe.recipe_service.data.dto.user.UserSimpleResponseDto;
import com.recipe.recipe_service.service.RecipeService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/recipe")
@AllArgsConstructor
@Slf4j
public class RecipeController {

    private final RecipeService recipeService;
    private final Environment env;
    private final UserServiceClient userServiceClient;
    private final IngredientServiceClient ingredientServiceClient;

    // 레시피 생성
    @PostMapping("")
    public ResponseEntity<Recipe> createRecipe(
            @RequestHeader("Authorization") String authorization,
            @RequestBody RecipeRegisterRequestDto requestDto) {

        Long userId = userServiceClient.getUserId(authorization);

        // 재료의 이름으로 재료 ID 가져오기
        requestDto.getRecipeMaterials().forEach(materialDto -> {
            Long ingredientId = ingredientServiceClient.getIngredientIdByName(materialDto.getMaterialName());
            materialDto.setMaterialId(ingredientId);
        });

        Recipe responseRecipe = recipeService.createRecipe(requestDto, userId);

        return ResponseEntity.status(HttpStatus.CREATED).body(responseRecipe);
    }
    
    // 레시피 삭제
    @DeleteMapping("")
    public ResponseEntity<?> deleteRecipe(
            @RequestHeader("Authorization") String authorization,
            @RequestParam("id") Long recipeId) {

        Long userId = userServiceClient.getUserId(authorization);

        recipeService.deleteRecipe(recipeId, userId);
        return ResponseEntity.ok().build();
    }

    // 레시피 전체 조회
    @GetMapping("")
    public ResponseEntity<List<RecipeDetailsResponseDto>> getAllRecipes(
            @RequestParam("pageSize") int pageSize,
            @RequestParam("pageNumber") int pageNumber) {

        // 서비스에서 페이징 처리된 레시피 목록 가져오기
        // pageNumber가 1부터 시작한다고 가정하고 0부터 시작하도록 맞춤
        List<RecipeDetailsResponseDto> recipeList = recipeService.getAllRecipes(pageNumber - 1, pageSize);

        return ResponseEntity.status(HttpStatus.OK).body(recipeList);

    }

    // 레시피 상세 조회
    @GetMapping("/{id}")
    public ResponseEntity<RecipeDetailsResponseDto> getRecipe(
            @PathVariable("id") Long recipeId) {

        RecipeDetailsResponseDto recipe = recipeService.getRecipe(recipeId);

        return ResponseEntity.status(HttpStatus.OK).body(recipe);
    }

    // 레시피 검색
    @GetMapping("/search")
    public ResponseEntity<List<RecipeDetailsResponseDto>> searchRecipe(
            @RequestParam("keyword") String keyword) {

        List<RecipeDetailsResponseDto> recipeList = recipeService.searchRecipe(keyword);

        return ResponseEntity.status(HttpStatus.OK).body(recipeList);
    }

    // 레시피 좋아요 등록
    @PostMapping("/like")
    public ResponseEntity<?> likeRecipe(
            @RequestHeader("Authorization") String authorization,
            @RequestParam("id") Long recipeId) {

        Long userId = userServiceClient.getUserId(authorization);

        recipeService.likeRecipe(recipeId, userId);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    // 레시피 좋아요 취소
    @PatchMapping("/unlike")
    public ResponseEntity<?> unlikeRecipe(
            @RequestHeader("Authorization") String authorization,
            @RequestParam("id") Long recipeId) {

        Long userId = userServiceClient.getUserId(authorization);

        recipeService.unlikeRecipe(recipeId, userId);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    // 레시피 스크랩 등록
    @PostMapping("/scrap")
    public ResponseEntity<?> scrapRecipe(
            @RequestHeader("Authorization") String authorization,
            @RequestParam("id") Long recipeId) {

        Long userId = userServiceClient.getUserId(authorization);

        recipeService.scrapRecipe(recipeId, userId);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    // 레시피 스크랩 취소
    @PatchMapping("/unscrap")
    public ResponseEntity<?> unscrapRecipe(
            @RequestHeader("Authorization") String authorization,
            @RequestParam("id") Long recipeId) {

        Long userId = userServiceClient.getUserId(authorization);

        recipeService.unscrapRecipe(recipeId, userId);

        return ResponseEntity.status(HttpStatus.OK).build();
    }



    // 특정 사용자가 만든 레시피 조회
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<UserRecipeRegistResponseDto>> getUserRecipes(@PathVariable("userId") Long userId) {
        List<UserRecipeRegistResponseDto> userRecipes = recipeService.getRecipesByUserId(userId);
        return ResponseEntity.status(HttpStatus.OK).body(userRecipes);
    }

    // 특정 사용자가 좋아요한 레시피 조회
    @GetMapping("/user/like/{userId}")
    public ResponseEntity<List<UserRecipeLikeResponseDto>> getUserLikeRecipes(@PathVariable("userId") Long userId) {
        List<UserRecipeLikeResponseDto> userLikeRecipes = recipeService.getUserLikeRecipes(userId);
        return ResponseEntity.status(HttpStatus.OK).body(userLikeRecipes);
    }

    // 특정 사용자가 스크랩한 레시피 조회
    @GetMapping("/user/scrap/{userId}")
    public ResponseEntity<List<UserRecipeScrapResponseDto>> getUserScrapRecipes(@PathVariable("userId") Long userId) {
        List<UserRecipeScrapResponseDto> userScrapRecipes = recipeService.getUserScrapRecipes(userId);
        return ResponseEntity.status(HttpStatus.OK).body(userScrapRecipes);
    }

}

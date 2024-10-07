package com.recipe.ingredient_service.controller;

import com.recipe.ingredient_service.client.RecipeServiceClient;
import com.recipe.ingredient_service.client.UserServiceClient;
import com.recipe.ingredient_service.data.domain.Ingredient;
import com.recipe.ingredient_service.data.dto.ingredient.request.IngredientRequestDto;
import com.recipe.ingredient_service.data.dto.ingredient.response.IngredientPopularResponseDto;
import com.recipe.ingredient_service.data.dto.ingredient.response.IngredientPriceChangeResponseDto;
import com.recipe.ingredient_service.data.dto.ingredient.response.IngredientPriceDetailsResponseDto;
import com.recipe.ingredient_service.data.dto.ingredient.response.IngredientsSearchResponseDto;
import com.recipe.ingredient_service.data.dto.recipe.response.RecipeResponseDto;
import com.recipe.ingredient_service.service.IngredientService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/ingredient")
@AllArgsConstructor
@Slf4j
public class IngredientController {

    private final UserServiceClient userServiceClient;
    private final IngredientService ingredientService;
    private final RecipeServiceClient recipeServiceClient;


    @GetMapping("/get-num/{name}")
    public Long getIngredientsNum(@PathVariable("name") String name) {
        return ingredientService.findSimilarName(name).getId();
    }

    @GetMapping("/get-id/{id}")
    public String getIngredientNameById(@PathVariable("id") Long materialId) {
        return ingredientService.findById(materialId).getName();
    }

    @GetMapping("/{search}")
    public ResponseEntity<IngredientsSearchResponseDto> getIngredientData(
            @PathVariable("search") String name) {
        return ResponseEntity.status(HttpStatus.OK).body(ingredientService.findIngredientData(name));
    }

    @GetMapping("/change")
    public ResponseEntity<List<IngredientPriceChangeResponseDto>> getIngredientPrice() {
        return ResponseEntity.status(HttpStatus.OK).body(ingredientService.findAllIngredientPriceData());
    }

    @GetMapping
    public ResponseEntity<IngredientPriceDetailsResponseDto> getIngredientAllDayPrice(@RequestParam("id") Long ingredientId) {
        return ResponseEntity.status(HttpStatus.OK).body(ingredientService.findAllDayIngredientPriceData(ingredientId));
    }

    @PostMapping("/recipe")
    public ResponseEntity<List<RecipeResponseDto>> getIngredientRecipe(@RequestBody List<IngredientRequestDto> ingredients) {
        // 요청된 재료 리스트에서 아이디 추출
        log.info("Received ingredients request: {}", ingredients); // 입력된 재료 리스트 로그

        List<Long> ingredientIds = ingredients.stream()
                .map(IngredientRequestDto::getId)
                .collect(Collectors.toList());

        log.info("Extracted ingredient IDs: {}", ingredientIds); // 추출된 재료 아이디 로그

        // 재료에 해당하는 레시피 아이디 조회
        List<Long> recipeIds = ingredientService.getRecipeIdByIngredients(ingredientIds);
        log.info("Found recipe IDs based on ingredients: {}", recipeIds); // 조회된 레시피 아이디 로그

        // FeignClient를 사용하여 레시피 서비스에서 레시피 리스트를 가져옴
        List<RecipeResponseDto> recipeList = recipeServiceClient.getRecipeList(recipeIds);
        log.info("Fetched recipe details: {}", recipeList); // 가져온 레시피 정보 로그

        return ResponseEntity.status(HttpStatus.OK).body(recipeList);
    }

    @GetMapping("/popular/week")
    public ResponseEntity<List<IngredientPopularResponseDto>> getPopularWeeklyIngredients() {
        return ResponseEntity.status(HttpStatus.OK).body(ingredientService.findPopularIngredients(7));
    }

    @GetMapping("/popular/month")
    public ResponseEntity<List<IngredientPopularResponseDto>> getPopularMonthlyIngredients() {
        return ResponseEntity.status(HttpStatus.OK).body(ingredientService.findPopularIngredients(30));
    }

    @PostMapping("/like")
    public ResponseEntity<?> addUserLikeIngredient(
            @RequestHeader("Authorization") String authorization,
            @RequestParam("id") Long ingredientId) {
        Long userId = userServiceClient.getUserId(authorization);
        ingredientService.addUserIngredientLike(userId, ingredientId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @DeleteMapping("/like")
    public ResponseEntity<?> deleteUserLikeIngredient(
            @RequestHeader("Authorization") String authorization,
            @RequestParam("id") Long ingredientId) {
        Long userId = userServiceClient.getUserId(authorization);
        ingredientService.removeUserIngredientLike(userId, ingredientId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("/like")
    public ResponseEntity<List<Ingredient>> findUserLikeIngredientList(@RequestHeader("Authorization") String authorization) {
        Long userId = userServiceClient.getUserId(authorization);
        return ResponseEntity.status(HttpStatus.OK).body(ingredientService.findUserLikeIngredients(userId));
    }

    @PostMapping("/test/add")
    public ResponseEntity<Ingredient> addTestIngredient(@RequestParam String name) {
        return ResponseEntity.status(HttpStatus.OK).body(ingredientService.addIngredient(name));
    }
}

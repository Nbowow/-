package com.recipe.ingredient_service.controller;

import com.recipe.ingredient_service.client.RecipeServiceClient;
import com.recipe.ingredient_service.client.UserServiceClient;
import com.recipe.ingredient_service.data.domain.Ingredient;
import com.recipe.ingredient_service.data.dto.ingredient.request.IngredientRequestDto;
import com.recipe.ingredient_service.data.dto.ingredient.response.*;
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

    @GetMapping("/search")
    public ResponseEntity<IngredientsSearchResponseDto> getIngredientData(
            @RequestParam("keyword") String keyword) {
        return ResponseEntity.status(HttpStatus.OK).body(ingredientService.findIngredientData(keyword));
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

        List<Long> ingredientIds = ingredients.stream()
                .map(IngredientRequestDto::getId)
                .collect(Collectors.toList());


        // 재료에 해당하는 레시피 아이디 조회
        List<Long> recipeIds = ingredientService.getRecipeIdByIngredients(ingredientIds);

        // FeignClient를 사용하여 레시피 서비스에서 레시피 리스트를 가져옴
        List<RecipeResponseDto> recipeList = recipeServiceClient.getRecipeList(recipeIds);

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

    @GetMapping("/low")
    public ResponseEntity<List<LowestPriceDto>> getLowestPriceResult(@RequestParam String query, @RequestParam String display, @RequestParam String start, @RequestParam String sort) throws Exception {
        return new ResponseEntity<>(ingredientService.getLowestPriceResult(query, display, start, sort), HttpStatus.OK);
    }


}

package com.recipe.recipe_service.controller;

import com.recipe.recipe_service.data.domain.Recipe;
import com.recipe.recipe_service.data.dto.recipe.RecipeDto;
import com.recipe.recipe_service.data.dto.recipe.request.RecipeRegisterRequestDto;
import com.recipe.recipe_service.data.dto.recipe.response.ResponseRecipe;
import com.recipe.recipe_service.repository.RecipeRepository;
import com.recipe.recipe_service.service.RecipeService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/recipe")
@AllArgsConstructor
@Slf4j
public class RecipeController {

    private final RecipeService recipeService;
    private final Environment env;
    private final ModelMapper modelMapper;
    private final RecipeRepository recipeRepository;

    @GetMapping("/health_check")
    public String status() {
        return String.format("PORT : %s", env.getProperty("server.port"));
    }

    @PostMapping("/create")
    public ResponseEntity<Recipe> createRecipe(
            @RequestHeader("Authorization")String authorization,
            @RequestBody RecipeRegisterRequestDto request) {

        RecipeRegisterRequestDto createRecipeDto = modelMapper.map(request, RecipeRegisterRequestDto.class);

        Recipe responseRecipe = recipeService.createRecipe(createRecipeDto);

        return ResponseEntity.status(HttpStatus.CREATED).body(responseRecipe);
    }

    @GetMapping("/{userId}/recipes")
    public ResponseEntity<?> getRecipes(@PathVariable("userId") Long userId) {
        Iterable<Recipe> recipeList = recipeService.getRecipesByUserEmail(userId);

        List<ResponseRecipe> responseRecipeList = new ArrayList<>();
        recipeList.forEach(v -> {
            responseRecipeList.add(new ModelMapper().map(v, ResponseRecipe.class));
        });

        return ResponseEntity.status(HttpStatus.OK).body(responseRecipeList);

    }


}

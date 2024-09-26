package com.example.recipe_service.controller;

import com.example.recipe_service.data.domain.Recipe;
import com.example.recipe_service.data.dto.recipe.RecipeDto;
import com.example.recipe_service.data.dto.recipe.request.RequestRecipe;
import com.example.recipe_service.data.dto.recipe.response.ResponseRecipe;
import com.example.recipe_service.repository.RecipeRepository;
import com.example.recipe_service.service.RecipeService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
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
public class RecipeController {

    private static final Logger log = LoggerFactory.getLogger(RecipeController.class);
    private final RecipeService recipeService;
    private final Environment env;
    private final RecipeRepository recipeRepository;

    @GetMapping("/health_check")
    public String status() {
        return String.format("PORT : %s", env.getProperty("server.port"));
    }

    @PostMapping("/{userId}/recipes")
    public ResponseEntity<?> createUser(@PathVariable("userId") Long userId, @RequestBody RequestRecipe recipeDetails) {
        log.info("userId : " + userId + " recipe details : " + recipeDetails);
        ModelMapper mapper = new ModelMapper();
        RecipeDto recipeDto = mapper.map(recipeDetails, RecipeDto.class);
        recipeDto.setUserId(userId);

        Recipe recipe = recipeService.createRecipe(recipeDto);

        return ResponseEntity.status(HttpStatus.CREATED).body(recipe);
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

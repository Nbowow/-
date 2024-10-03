package com.recipe.recipe_service.controller;

import com.recipe.recipe_service.client.UserServiceClient;
import com.recipe.recipe_service.data.domain.Recipe;
import com.recipe.recipe_service.data.dto.recipe.RecipeDto;
import com.recipe.recipe_service.data.dto.recipe.request.RecipeRegisterRequestDto;
import com.recipe.recipe_service.data.dto.recipe.response.ResponseRecipe;
import com.recipe.recipe_service.repository.RecipeRepository;
import com.recipe.recipe_service.service.RecipeService;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.env.Environment;
import org.springframework.data.domain.Page;
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
    private final UserServiceClient userServiceClient;

    @GetMapping("/health_check")
    public String status() {
        return String.format("PORT : %s", env.getProperty("server.port"));
    }

    // 레시피 생성
    @PostMapping("/create")
    public ResponseEntity<Recipe> createRecipe(
            @RequestHeader("Authorization") String authorization,
            @RequestBody RecipeRegisterRequestDto requestDto) {

        Long userId = userServiceClient.getUserId(authorization);

        Recipe responseRecipe = recipeService.createRecipe(requestDto, userId);

        return ResponseEntity.status(HttpStatus.CREATED).body(responseRecipe);
    }

    // 레시피 전체 조회
    @GetMapping("")
    public ResponseEntity<List<ResponseRecipe>> getAllRecipes(
            @RequestParam("pageSize") int pageSize,
            @RequestParam("pageNumber") int pageNumber) {

        // 서비스에서 페이징 처리된 레시피 목록 가져오기
        // pageNumber가 1부터 시작한다고 가정하고 0부터 시작하도록 맞춤
        List<ResponseRecipe> recipeList = recipeService.getAllRecipes(pageNumber - 1, pageSize);

        return ResponseEntity.status(HttpStatus.OK).body(recipeList);

    }

    // 레시피 상세 조회
    @GetMapping("")
    public ResponseEntity<ResponseRecipe> getRecipe(
            @RequestParam("id") Long id) {

        ResponseRecipe recipe = recipeService.getRecipe(id);

        return ResponseEntity.status(HttpStatus.OK).body(recipe);
    }


}

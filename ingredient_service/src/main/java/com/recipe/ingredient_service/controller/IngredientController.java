package com.recipe.ingredient_service.controller;

import com.recipe.ingredient_service.data.dto.ingredient.response.IngredientIdResponseDto;
import com.recipe.ingredient_service.service.IngredientService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/ingredient")
@AllArgsConstructor
@Slf4j
public class IngredientController {

    private final IngredientService ingredientService;


    @GetMapping("/get-num/{name}")
    public Long getIngredientsNum(@PathVariable("name") String name) {
        return ingredientService.findSimilarName(name).getId();
    }


}

package com.recipe.recipe_service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "ingredient-service")
public interface IngredientServiceClient {

    @GetMapping("/api/v1/ingredient/get-num/{name}")
    Long getIngredientIdByName(@PathVariable("name") String name);


}
package com.recipe.recipe_service.service;


import com.recipe.recipe_service.data.domain.Recipe;
import com.recipe.recipe_service.repository.RecipeRepository;
import jakarta.annotation.PostConstruct;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RecipeIndexingService {

    @Autowired
    private RecipeRepository recipeRepository;

    // 애플리케이션 실행 시 모든 데이터를 Elasticsearch에 인덱싱
    public void indexAllRecipes() {
        List<Recipe> recipes = recipeRepository.findAll();  // MySQL에서 모든 레시피 가져오기
        recipeRepository.saveAll(recipes);  // Elasticsearch에 인덱싱
    }
}
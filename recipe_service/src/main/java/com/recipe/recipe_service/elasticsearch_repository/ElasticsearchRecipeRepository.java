package com.recipe.recipe_service.elasticsearch_repository;

import com.recipe.recipe_service.data.domain.Recipe;
import com.recipe.recipe_service.data.domain.RecipeDocument;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;

public interface ElasticsearchRecipeRepository extends ElasticsearchRepository<RecipeDocument, Long> {

    List<Recipe> findByTitleContaining(String keyword);

    List<Recipe> findByIntroContaining(String keyword);

    List<Recipe> findByNameStartingWith(String prefix);

    @Query("{ \"match\": { \"recipe_title\": { \"query\": \"?0\", \"fuzziness\": \"AUTO\" } } }")
    List<Recipe> findByTitleWithTypoCorrection(String title);
}
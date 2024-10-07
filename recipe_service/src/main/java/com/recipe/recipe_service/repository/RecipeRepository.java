package com.recipe.recipe_service.repository;

import com.recipe.recipe_service.data.domain.Recipe;
import com.recipe.recipe_service.data.dto.recipe.response.RecipeDetailsResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface RecipeRepository extends JpaRepository<Recipe, Long>,
    ElasticsearchRepository<Recipe, Long> {

    List<Recipe> findByUserId(Long userId);

    Page<Recipe> findAll(Pageable pageable);

    Optional<Recipe> findById(Long recipeId);

    @Query("SELECT r FROM Recipe r WHERE " +
            "LOWER(r.title) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(r.name) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(r.intro) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Recipe> searchByKeyword(String keyword);

    void deleteById(Long recipeId);

    List<Recipe> findByIdIn(List<Long> ids);

    // Elasticsearch 메서드
    List<Recipe> findByTitleContaining(String keyword);

    List<Recipe> findByIntroContaining(String keyword);

    List<Recipe> findByNameStartingWith(String prefix);


}

package com.recipe.recipe_service.repository;

import com.recipe.recipe_service.data.domain.Recipe;
import com.recipe.recipe_service.data.dto.recipe.response.ResponseRecipe;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface RecipeRepository extends JpaRepository<Recipe, Integer> {

    Iterable<Recipe> findByUserId(Long userId);

    Page<Recipe> findAll(Pageable pageable);

    Optional<ResponseRecipe> findById(Long recipeId);

    @Query("SELECT r FROM Recipe r WHERE " +
            "LOWER(r.title) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(r.name) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(r.intro) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Recipe> searchByKeyword(String keyword);
}

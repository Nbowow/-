package com.recipe.recipe_service.repository;

import com.recipe.recipe_service.data.domain.RecipeScraps;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RecipeScrapsRepository extends JpaRepository<RecipeScraps, Integer> {
    Optional<RecipeScraps> findByRecipeIdAndUserId(Long recipeId, Long userId);
}

package com.recipe.recipe_service.repository;

import com.recipe.recipe_service.data.domain.RecipeComments;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecipeCommentsRepository extends JpaRepository<RecipeComments, Integer> {
    // 특정 레시피의 모든 댓글 조회
    List<RecipeComments> findByRecipeId(Long recipeId);
}

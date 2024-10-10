package com.recipe.recipe_service.repository;

import com.recipe.recipe_service.data.domain.Recipe;
import com.recipe.recipe_service.data.dto.recipe.response.RecipeDetailsResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {

    List<Recipe> findByUserId(Long userId);

    Page<Recipe> findAll(Pageable pageable);

    Optional<Recipe> findById(Long recipeId);

    @Query("SELECT r FROM Recipe r WHERE " +
            "LOWER(r.title) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(r.name) LIKE LOWER(CONCAT('%', :keyword, '%')) ")
    List<Recipe> searchByKeyword(String keyword);

    void deleteById(Long recipeId);

    List<Recipe> findByIdIn(List<Long> ids);

    @Query("SELECT r.name FROM Recipe r")
    List<String> findAllRecipeNames();

    @Query("SELECT r.name FROM Recipe r WHERE LOWER(r.name) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<String> findRecipeNamesByKeyword(@Param("keyword") String keyword, Pageable pageable);

    @Query("SELECT r FROM Recipe r JOIN RecipeMaterials rm ON r.id = rm.recipeId " +
            "WHERE rm.materialId IN :ingredientIds " +
            "GROUP BY r.id " +
            "HAVING COUNT(rm.materialId) >= :minMatchCount")
    List<Recipe> findRecipesByIngredients(
            @Param("ingredientIds") List<Long> ingredientIds,
            @Param("minMatchCount") long minMatchCount);

    @Query("SELECT r FROM Recipe r ORDER BY r.likeCount DESC")
    List<Recipe> findTopByOrderByLikeCountDesc(Pageable pageable);

    // type 필드에서 commonCode로 검색
    List<Recipe> findByType(String type);

    // situation 필드에서 commonCode로 검색
    List<Recipe> findBySituation(String situation);

    // ingredients 필드에서 commonCode로 검색
    List<Recipe> findByIngredients(String ingredients);

    // method 필드에서 commonCode로 검색
    List<Recipe> findByMethod(String method);
}
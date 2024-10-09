package com.recipe.ingredient_service.repository;


import com.recipe.ingredient_service.data.domain.Recipematerials;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RecipematerialsRepository extends JpaRepository<Recipematerials, Long> {

    // 하나의 재료만 사용하는 레시피를 가져오는 쿼리 (페이징 추가)
    @Query("SELECT rm.recipeId FROM Recipematerials rm WHERE rm.materialId = :ingredientId")
    List<Long> findRecipeIdsBySingleIngredientId(@Param("ingredientId") Long ingredientId, Pageable pageable);

    // 여러 재료를 모두 사용하는 레시피를 가져오는 쿼리 (페이징 추가, 적어도 모든 재료를 포함하는 레시피)
    @Query("SELECT rm.recipeId FROM Recipematerials rm WHERE rm.materialId IN :ingredientIds " +
            "GROUP BY rm.recipeId HAVING COUNT(rm.recipeId) >= :ingredientCount")
    List<Long> findRecipeIdsByAllIngredientIds(@Param("ingredientIds") List<Long> ingredientIds,
                                               @Param("ingredientCount") Long ingredientCount,
                                               Pageable pageable);
}
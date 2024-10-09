package com.recipe.ingredient_service.repository;


import com.recipe.ingredient_service.data.domain.Recipematerials;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RecipematerialsRepository extends JpaRepository<Recipematerials, Long> {

    // 재료 아이디가 모두 포함된 레시피만 조회하는 JPQL 쿼리, 페이징을 추가하여 최대 3개만 반환
    @Query("SELECT rm.recipeId FROM Recipematerials rm WHERE rm.materialId IN :ingredientIds " +
            "GROUP BY rm.recipeId HAVING COUNT(rm.recipeId) = :ingredientCount")
    List<Long> findRecipeIdsByAllIngredientIds(@Param("ingredientIds") List<Long> ingredientIds,
                                               @Param("ingredientCount") Long ingredientCount,
                                               Pageable pageable);
}
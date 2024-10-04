package com.recipe.recipe_service.repository;

import com.recipe.recipe_service.data.domain.RecipeMaterials;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipeMaterialsRepository extends JpaRepository<RecipeMaterials, Integer> {
}

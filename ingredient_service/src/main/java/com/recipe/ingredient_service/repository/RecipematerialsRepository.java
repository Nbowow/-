package com.recipe.ingredient_service.repository;


import com.recipe.ingredient_service.data.domain.Recipematerials;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecipematerialsRepository extends JpaRepository<Recipematerials, Long> {
    List<Recipematerials> findByMaterialIdIn(List<Long> materialIds);
}
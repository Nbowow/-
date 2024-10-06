package com.recipe.yorijori.repository;

import com.recipe.yorijori.data.domain.Allergys;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AllergyRespository extends JpaRepository<Allergys,Long> {
    List<Allergys> findAllByUserId(Long userId);
}

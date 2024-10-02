package com.recipe.recipe_service.data.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "recipes")
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long recipeId;
    private Long userId;

    @Column(name = "recipe_title")
    private String title;

    @Column(name = "recipe_name")
    private String name;

    @Column(name = "recipe_info")
    private String info;


}

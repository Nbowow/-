package com.recipe.recipe_service.data.domain;

import jakarta.persistence.*;
import jakarta.ws.rs.DefaultValue;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Recipes")
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "recipe_id")
    private Long id;

    @Column(name = "recipe_title")
    private String title;

    @Column(name = "recipe_name")
    private String name;

    @Column(name = "recipe_intro")
    private String intro; // 레시피 소개

    @Column(name = "recipe_image")
    private String image;

    @Column(name = "recipe_like_count")
    private Long likeCount;

    @Column(name = "recipe_view_count")
    private Long viewCount;

    @Column(name = "recipe_servings")
    private Long servings;

    @Column(name = "recipe_time")
    private Long time;

    @Column(name = "recipe_level")
    private String level;

    private String type;

    private String situation;

    private String ingredients;

    private String method;

    private LocalDateTime createdDate;

    private LocalDateTime modifiedDate;

    @DefaultValue(value = "true")
    private Boolean userStatus;


}

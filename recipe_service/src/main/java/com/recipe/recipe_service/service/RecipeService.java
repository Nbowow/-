package com.recipe.recipe_service.service;

import com.recipe.recipe_service.data.domain.Recipe;
import com.recipe.recipe_service.data.domain.RecipeComments;
import com.recipe.recipe_service.data.domain.RecipeLikes;
import com.recipe.recipe_service.data.domain.RecipeScraps;
import com.recipe.recipe_service.data.dto.comment.CommentResponseDto;
import com.recipe.recipe_service.data.dto.recipe.RecipeDto;
import com.recipe.recipe_service.data.dto.recipe.request.RecipeRegisterRequestDto;
import com.recipe.recipe_service.data.dto.recipe.response.ResponseRecipe;
import com.recipe.recipe_service.data.dto.recipe.response.UserRecipeLikeResponseDto;
import com.recipe.recipe_service.data.dto.recipe.response.UserRecipeRegistResponseDto;
import com.recipe.recipe_service.data.dto.recipe.response.UserRecipeScrapResponseDto;
import com.recipe.recipe_service.repository.RecipeCommentsRepository;
import com.recipe.recipe_service.repository.RecipeLikesRepository;
import com.recipe.recipe_service.repository.RecipeRepository;
import com.recipe.recipe_service.repository.RecipeScrapsRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
@AllArgsConstructor
public class RecipeService {

    private final RecipeRepository recipeRepository;
    private final RecipeLikesRepository recipeLikesRepository;
    private final RecipeCommentsRepository recipeCommentsRepository;
    private final RecipeScrapsRepository recipeScrapsRepository;

    public Recipe createRecipe(RecipeRegisterRequestDto createRecipeDto, Long userId) {

        // Builder 패턴을 사용하여 RecipeRegisterRequestDto 객체 생성
        Recipe recipeEntity = Recipe.builder()
                .userId(userId)  // userId를 설정
                .title(createRecipeDto.getTitle())  // 다른 값들을 그대로 사용
                .name(createRecipeDto.getName())
                .intro(createRecipeDto.getIntro())
                .image(createRecipeDto.getImage())
                .likeCount(0L)
                .viewCount(0L)
                .servings(createRecipeDto.getServings())
                .time(createRecipeDto.getTime())
                .level(createRecipeDto.getLevel())
                .cookingTools(createRecipeDto.getCookingTools())
                .type(createRecipeDto.getType())
                .situation(createRecipeDto.getSituation())
                .ingredients(createRecipeDto.getIngredients())
                .method(createRecipeDto.getMethod())
                .userStatus(true)  // 필요 시 기본값을 넣거나 그대로 사용
                .build();

        // 변환된 엔티티를 저장
        return recipeRepository.save(recipeEntity);
    }

    public Iterable<Recipe> getRecipesByUserEmail(Long userId) {
        return recipeRepository.findByUserId(userId);
    }

    public List<ResponseRecipe> getAllRecipes(int pageNumber, int pageSize) {
        // 페이지 요청을 생성하여 레시피를 페이징 처리
        Pageable pageable = PageRequest.of(pageNumber, pageSize);

        Page<Recipe> recipePage = recipeRepository.findAll(pageable);

        // 페이지 결과에서 데이터를 추출하여 DTO로 변환
        List<ResponseRecipe> recipeList = recipePage.getContent().stream()
                .map(recipe -> ResponseRecipe.builder()
                        .id(recipe.getId())
                        .title(recipe.getTitle())
                        .name(recipe.getName())
                        .intro(recipe.getIntro())
                        .image(recipe.getImage())
                        .viewCount(recipe.getViewCount())
                        .servings(recipe.getServings())
                        .time(recipe.getTime())
                        .level(recipe.getLevel())
                        .type(recipe.getType())
                        .situation(recipe.getSituation())
                        .ingredients(recipe.getIngredients())
                        .method(recipe.getMethod())
                        .userId(recipe.getUserId())
                        .likeCount(recipe.getLikeCount())
                        .scrapCount(recipe.getScrapCount())
                        .commentCount(recipe.getCommentCount())
                        .build())
                .toList();

        return recipeList;
    }

    public ResponseRecipe getRecipe(Long id) {

        return recipeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("해당 ID에 해당하는 레시피가 존재하지 않습니다."));
    }

    public List<ResponseRecipe> searchRecipe(String keyword) {

        List<Recipe> recipes = recipeRepository.searchByKeyword(keyword);

        // Recipe -> ResponseRecipe로 변환
        return recipes.stream()
                .map(recipe -> ResponseRecipe.builder()
                        .id(recipe.getId())
                        .title(recipe.getTitle())
                        .name(recipe.getName())
                        .intro(recipe.getIntro())
                        .image(recipe.getImage())
                        .viewCount(recipe.getViewCount())
                        .servings(recipe.getServings())
                        .time(recipe.getTime())
                        .level(recipe.getLevel())
                        .cookingTools(recipe.getCookingTools())
                        .type(recipe.getType())
                        .situation(recipe.getSituation())
                        .ingredients(recipe.getIngredients())
                        .method(recipe.getMethod())
                        .userId(recipe.getUserId())
                        .likeCount(recipe.getLikeCount())
                        .scrapCount(recipe.getScrapCount())
                        .commentCount(recipe.getCommentCount())
                        .build())
                .toList();

    }

    @Transactional
    public void likeRecipe(Long recipeId, Long userId) {
        Optional<RecipeLikes> existingLike = recipeLikesRepository.findByRecipeIdAndUserId(recipeId, userId);

        if (existingLike.isPresent()) {
            RecipeLikes recipeLikes = existingLike.get();
            if (!recipeLikes.getStatus()) {
                // status false -> true
                recipeLikes.setStatus(true);
            }
            return;
        }

        // 새로운 좋아요 등록
        RecipeLikes newLikes = RecipeLikes.builder()
                .recipeId(recipeId)
                .userId(userId)
                .status(true) // 좋아요 상태로 설정
                .build();

        recipeLikesRepository.save(newLikes);
    }

    @Transactional
    public void unlikeRecipe(Long recipeId, Long userId) {
        Optional<RecipeLikes> existingLike = recipeLikesRepository.findByRecipeIdAndUserId(recipeId, userId);

        if (existingLike.isPresent()) {
            RecipeLikes recipeLikes = existingLike.get();
            if (recipeLikes.getStatus()) {
                // status true -> false (좋아요 취소)
                recipeLikes.setStatus(false);
            }
        } else {
            throw new IllegalStateException("좋아요가 등록되지 않은 상태입니다.");
        }
    }

    @Transactional
    public void scrapRecipe(Long recipeId, Long userId) {
        Optional<RecipeScraps> existingScrap = recipeScrapsRepository.findByRecipeIdAndUserId(recipeId, userId);

        if (existingScrap.isPresent()) {
            RecipeScraps recipeScraps = existingScrap.get();
            if (!recipeScraps.getStatus()) {
                // status false -> true (스크랩 등록)
                recipeScraps.setStatus(true);
            }
            return;
        }

        // 새로운 스크랩 등록
        RecipeScraps newScrap = RecipeScraps.builder()
                .recipeId(recipeId)
                .userId(userId)
                .status(true)
                .build();
        recipeScrapsRepository.save(newScrap);

    }

    @Transactional
    public void unscrapRecipe(Long recipeId, Long userId) {
        Optional<RecipeScraps> existingScrap = recipeScrapsRepository.findByRecipeIdAndUserId(recipeId, userId);

        if (existingScrap.isPresent()) {
            RecipeScraps recipeScraps = existingScrap.get();
            if (recipeScraps.getStatus()) {
                // status true -> false (스크랩 취소)
                recipeScraps.setStatus(false);
            }
        } else {
            throw new IllegalStateException("스크랩이 등록되지 않은 상태입니다.");
        }
    }

    @Transactional
    public void addComment(Long recipeId, Long userId, String content) {
        RecipeComments newComment = RecipeComments.builder()
                .recipeId(recipeId)
                .userId(userId)
                .commentContent(content)
                .status(true) // 댓글 등록
                .build();

        recipeCommentsRepository.save(newComment);
    }

    public List<RecipeComments> getCommentsByRecipeId(Long recipeId) {
        // 댓글 조회
        return recipeCommentsRepository.findByRecipeId(recipeId);
    }




    // 특정 userId에 해당하는 레시피 조회
    public List<UserRecipeRegistResponseDto> getRecipesByUserId(Long userId) {
        List<Recipe> recipes = recipeRepository.findByUserId(userId);

        // Entity를 DTO로 변환
        return recipes.stream()
                .map(recipe -> new UserRecipeRegistResponseDto(
                        recipe.getId(),
                        recipe.getTitle(),
                        recipe.getName(),
                        recipe.getIntro(),
                        recipe.getImage(),
                        recipe.getViewCount(),
                        recipe.getServings(),
                        recipe.getTime(),
                        recipe.getLevel(),
                        recipe.getCookingTools(),
                        recipe.getType(),
                        recipe.getSituation(),
                        recipe.getIngredients(),
                        recipe.getMethod(),
                        recipe.getUserId(),
                        recipe.getLikeCount(),
                        recipe.getScrapCount(),
                        recipe.getCommentCount()
                ))
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<UserRecipeLikeResponseDto> getUserLikeRecipes(Long userId) {
        // 특정 유저가 좋아요한 레시피 ID 목록 가져오기
        List<RecipeLikes> likedRecipes = recipeLikesRepository.findByUserIdAndStatusTrue(userId);

        // 레시피 ID에 해당하는 레시피 정보를 가져와 DTO로 변환
        List<UserRecipeLikeResponseDto> likedRecipeDtos = likedRecipes.stream()
                .map(recipeLike -> {
                    ResponseRecipe recipe = recipeRepository.findById(recipeLike.getRecipeId())
                            .orElseThrow(() -> new EntityNotFoundException("Recipe not found"));

                    return new UserRecipeLikeResponseDto(
                            recipe.getId(),
                            recipe.getTitle(),
                            recipe.getName(),
                            recipe.getIntro(),
                            recipe.getImage(),
                            recipe.getViewCount(),
                            recipe.getServings(),
                            recipe.getTime(),
                            recipe.getLevel(),
                            recipe.getCookingTools(),
                            recipe.getType(),
                            recipe.getSituation(),
                            recipe.getIngredients(),
                            recipe.getMethod(),
                            recipe.getUserId(),
                            recipe.getLikeCount(),
                            recipe.getScrapCount(),
                            recipe.getCommentCount()
                    );
                })
                .collect(Collectors.toList());

        return likedRecipeDtos;
    }

    @Transactional(readOnly = true)
    public List<UserRecipeScrapResponseDto> getUserScrapRecipes(Long userId) {
        // 특정 유저가 좋아요한 레시피 ID 목록 가져오기
        List<RecipeScraps> scrapedRecipes = recipeScrapsRepository.findByUserIdAndStatusTrue(userId);

        // 레시피 ID에 해당하는 레시피 정보를 가져와 DTO로 변환
        List<UserRecipeScrapResponseDto> scrapedRecipeDtos = scrapedRecipes.stream()
                .map(recipeScraps -> {
                    ResponseRecipe recipe = recipeRepository.findById(recipeScraps.getRecipeId())
                            .orElseThrow(() -> new EntityNotFoundException("Recipe not found"));

                    return new UserRecipeScrapResponseDto(
                            recipe.getId(),
                            recipe.getTitle(),
                            recipe.getName(),
                            recipe.getIntro(),
                            recipe.getImage(),
                            recipe.getViewCount(),
                            recipe.getServings(),
                            recipe.getTime(),
                            recipe.getLevel(),
                            recipe.getCookingTools(),
                            recipe.getType(),
                            recipe.getSituation(),
                            recipe.getIngredients(),
                            recipe.getMethod(),
                            recipe.getUserId(),
                            recipe.getLikeCount(),
                            recipe.getScrapCount(),
                            recipe.getCommentCount()
                    );
                })
                .collect(Collectors.toList());

        return scrapedRecipeDtos;
    }


}
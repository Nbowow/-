package com.recipe.recipe_service.controller;

import com.recipe.recipe_service.client.UserServiceClient;
import com.recipe.recipe_service.data.domain.Recipe;
import com.recipe.recipe_service.data.domain.RecipeComments;
import com.recipe.recipe_service.data.dto.comment.CommentRegisterRequestDto;
import com.recipe.recipe_service.data.dto.comment.CommentResponseDto;
import com.recipe.recipe_service.data.dto.recipe.request.RecipeRegisterRequestDto;
import com.recipe.recipe_service.data.dto.recipe.response.ResponseRecipe;
import com.recipe.recipe_service.data.dto.user.UserSimpleResponseDto;
import com.recipe.recipe_service.service.RecipeService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/recipe")
@AllArgsConstructor
@Slf4j
public class RecipeController {

    private final RecipeService recipeService;
    private final Environment env;
    private final UserServiceClient userServiceClient;

    @GetMapping("/health_check")
    public String status() {
        return String.format("PORT : %s", env.getProperty("server.port"));
    }

    // 레시피 생성
    @PostMapping("/create")
    public ResponseEntity<Recipe> createRecipe(
            @RequestHeader("Authorization") String authorization,
            @RequestBody RecipeRegisterRequestDto requestDto) {

        Long userId = userServiceClient.getUserId(authorization);

        Recipe responseRecipe = recipeService.createRecipe(requestDto, userId);

        return ResponseEntity.status(HttpStatus.CREATED).body(responseRecipe);
    }

    // 레시피 전체 조회
    @GetMapping("")
    public ResponseEntity<List<ResponseRecipe>> getAllRecipes(
            @RequestParam("pageSize") int pageSize,
            @RequestParam("pageNumber") int pageNumber) {

        // 서비스에서 페이징 처리된 레시피 목록 가져오기
        // pageNumber가 1부터 시작한다고 가정하고 0부터 시작하도록 맞춤
        List<ResponseRecipe> recipeList = recipeService.getAllRecipes(pageNumber - 1, pageSize);

        return ResponseEntity.status(HttpStatus.OK).body(recipeList);

    }

    // 레시피 상세 조회
    @GetMapping("/{id}")
    public ResponseEntity<ResponseRecipe> getRecipe(
            @PathVariable("id") Long id) {

        ResponseRecipe recipe = recipeService.getRecipe(id);

        return ResponseEntity.status(HttpStatus.OK).body(recipe);
    }

    // 레시피 검색
    @GetMapping("/search")
    public ResponseEntity<List<ResponseRecipe>> searchRecipe(
            @RequestParam("keyword") String keyword) {

        List<ResponseRecipe> recipeList = recipeService.searchRecipe(keyword);

        return ResponseEntity.status(HttpStatus.OK).body(recipeList);
    }

    // 레시피 좋아요 등록
    @PostMapping("/like")
    public ResponseEntity<?> likeRecipe(
            @RequestHeader("Authorization") String authorization,
            @RequestParam("id") Long recipeId) {

        Long userId = userServiceClient.getUserId(authorization);

        recipeService.likeRecipe(recipeId, userId);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    // 레시피 좋아요 취소
    @PatchMapping("/unlike")
    public ResponseEntity<?> unlikeRecipe(
            @RequestHeader("Authorization") String authorization,
            @RequestParam("id") Long recipeId) {

        Long userId = userServiceClient.getUserId(authorization);

        recipeService.unlikeRecipe(recipeId, userId);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    // 레시피 스크랩 등록
    @PostMapping("/scrap")
    public ResponseEntity<?> scrapRecipe(
            @RequestHeader("Authorization") String authorization,
            @RequestParam("id") Long recipeId) {

        Long userId = userServiceClient.getUserId(authorization);

        recipeService.scrapRecipe(recipeId, userId);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    // 레시피 스크랩 취소
    @PatchMapping("/unscrap")
    public ResponseEntity<?> unscrapRecipe(
            @RequestHeader("Authorization") String authorization,
            @RequestParam("id") Long recipeId) {

        Long userId = userServiceClient.getUserId(authorization);

        recipeService.unscrapRecipe(recipeId, userId);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    // 레시피 댓글 등록
    @PostMapping("/comment")
    public ResponseEntity<?> commentRecipe(
            @RequestHeader("Authorization") String authorization,
            @RequestParam("id") Long recipeId,
            @RequestBody CommentRegisterRequestDto content) {

        Long userId = userServiceClient.getUserId(authorization);

        recipeService.addComment(recipeId, userId, content.getContent());

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    // 레시피 댓글 조회
    @GetMapping("/comment")
    public ResponseEntity<?> getComment(@RequestParam("id") Long recipeId) {

        List<RecipeComments> comments = recipeService.getCommentsByRecipeId(recipeId);

        List<CommentResponseDto> responseComments = comments.stream()
                .map(comment -> {
                    // 사용자 정보 조회 후 닉네임과 프로필 이미지 가져오기
                    UserSimpleResponseDto userInfo = userServiceClient.getUserInfo(comment.getUserId());

                    // 댓글 정보를 CommentResponseDto로 변환
                    return CommentResponseDto.builder()
                            .profileImage(userInfo.getProfileImage())
                            .nickname(userInfo.getNickname())
                            .content(comment.getCommentContent())
                            .createdDate(comment.getCreatedDate())
                            .modifiedDate(comment.getModifiedDate())
                            .build();
                })
                .collect(Collectors.toList());

        return ResponseEntity.status(HttpStatus.OK).body(responseComments);
    }

}

package com.recipe.recipe_service.controller;

import com.recipe.recipe_service.client.IngredientServiceClient;
import com.recipe.recipe_service.client.UserServiceClient;
import com.recipe.recipe_service.data.domain.Recipe;
import com.recipe.recipe_service.data.dto.ingredient.response.IngredientLikeResponseDto;
import com.recipe.recipe_service.data.dto.recipe.request.RecipeRegisterRequestDto;
import com.recipe.recipe_service.data.dto.recipe.response.*;
import com.recipe.recipe_service.global.config.LevenshteinDistance;
import com.recipe.recipe_service.repository.RecipeRepository;
import com.recipe.recipe_service.data.dto.user.response.UserAllergyResponseDto;
import com.recipe.recipe_service.service.RecipeService;
import com.recipe.recipe_service.service.S3Uploader;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/recipe")
@AllArgsConstructor
@Slf4j
public class RecipeController {

    private final RecipeService recipeService;
    private final UserServiceClient userServiceClient;
    private final IngredientServiceClient ingredientServiceClient;
    private final RecipeRepository recipeRepository;
    private final S3Uploader s3Uploader;
    // 레시피 생성
    @PostMapping("")
    public ResponseEntity<Recipe> createRecipe(
            @RequestHeader("Authorization") String authorization,
            @RequestPart("recipeImage") MultipartFile recipeImage,  // 레시피 메인 이미지 파일
            @RequestPart("orderImages") List<MultipartFile> orderImages, // 레시피 순서 이미지 파일들
            @RequestPart("recipe") RecipeRegisterRequestDto requestDto) throws IOException {

        Long userId = userServiceClient.getUserId(authorization);

        // S3에 레시피 메인 이미지 업로드
        String recipeImageUrl = s3Uploader.saveFile(recipeImage);
        requestDto.setImage(recipeImageUrl); // 업로드된 이미지 URL을 DTO에 저장

        // S3에 레시피 순서 이미지 업로드
        List<String> orderImageUrls = new ArrayList<>();
        for (MultipartFile orderImage : orderImages) {
            String orderImageUrl = s3Uploader.saveFile(orderImage);
            orderImageUrls.add(orderImageUrl);
        }

        // 순서 이미지 URL을 DTO의 각 순서에 저장
        for (int i = 0; i < requestDto.getRecipeOrders().size(); i++) {
            requestDto.getRecipeOrders().get(i).setOrderImg(orderImageUrls.get(i));
        }

        // 재료의 이름으로 재료 ID 가져오기
        requestDto.getRecipeMaterials().forEach(materialDto -> {
            Long ingredientId = ingredientServiceClient.getIngredientIdByName(materialDto.getMaterialName());
            materialDto.setMaterialId(ingredientId);
        });

        Recipe responseRecipe = recipeService.createRecipe(requestDto, userId);

        userServiceClient.plusPoint(authorization,userId);

        return ResponseEntity.status(HttpStatus.CREATED).body(responseRecipe);
    }
    
    // 레시피 삭제
    @DeleteMapping("")
    public ResponseEntity<?> deleteRecipe(
            @RequestHeader("Authorization") String authorization,
            @RequestParam("id") Long recipeId) {

        Long userId = userServiceClient.getUserId(authorization);

        recipeService.deleteRecipe(recipeId, userId);
        return ResponseEntity.ok().build();
    }

    // 레시피 전체 조회
    @GetMapping("")
    public ResponseEntity<List<RecipeDetailsResponseDto>> getAllRecipes(
            @RequestParam("pageSize") int pageSize,
            @RequestParam("pageNumber") int pageNumber) {

        // 서비스에서 페이징 처리된 레시피 목록 가져오기
        // pageNumber가 1부터 시작한다고 가정하고 0부터 시작하도록 맞춤
        List<RecipeDetailsResponseDto> recipeList = recipeService.getAllRecipes(pageNumber - 1, pageSize);

        return ResponseEntity.status(HttpStatus.OK).body(recipeList);

    }

    // 레시피 상세 조회
    @GetMapping("/{id}")
    public ResponseEntity<RecipeDetailsResponseDto> getRecipe(
            @PathVariable("id") Long recipeId) {

        RecipeDetailsResponseDto recipe = recipeService.getRecipe(recipeId);

        return ResponseEntity.status(HttpStatus.OK).body(recipe);
    }

    // 레시피 검색
    @GetMapping("/search")
    public ResponseEntity<?> searchRecipe(
            @RequestParam("keyword") String keyword) {

        List<RecipeDetailsResponseDto> recipeList = recipeService.searchRecipe(keyword);

        // 검색 결과가 없을 경우, 오타 수정 로직 호출
        if (recipeList.isEmpty()) {
            String correctedWord = searchTypo(keyword); // 오타 수정 API 호출
            return ResponseEntity.status(HttpStatus.OK).body(correctedWord);
        }

        return ResponseEntity.status(HttpStatus.OK).body(recipeList);
    }

    // 특정 사용자가 만든 레시피 조회
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<UserRecipeRegistResponseDto>> getUserRecipes(@PathVariable("userId") Long userId) {
        List<UserRecipeRegistResponseDto> userRecipes = recipeService.getRecipesByUserId(userId);
        return ResponseEntity.status(HttpStatus.OK).body(userRecipes);
    }

    // 특정 사용자가 좋아요한 레시피 조회
    @GetMapping("/user/like/{userId}")
    public ResponseEntity<List<UserRecipeLikeResponseDto>> getUserLikeRecipes(@PathVariable("userId") Long userId) {
        List<UserRecipeLikeResponseDto> userLikeRecipes = recipeService.getUserLikeRecipes(userId);
        return ResponseEntity.status(HttpStatus.OK).body(userLikeRecipes);
    }

    // 특정 사용자가 스크랩한 레시피 조회
    @GetMapping("/user/scrap/{userId}")
    public ResponseEntity<List<UserRecipeScrapResponseDto>> getUserScrapRecipes(@PathVariable("userId") Long userId) {
        List<UserRecipeScrapResponseDto> userScrapRecipes = recipeService.getUserScrapRecipes(userId);
        return ResponseEntity.status(HttpStatus.OK).body(userScrapRecipes);
    }


    // 사용자 알러지 기반 레시피 추천
    @GetMapping("/recommend")
    public ResponseEntity<List<RecipeRecommendResponseDto>> getUserRecommendations(
            @RequestHeader("Authorization") String authorization) {

        Long userId = userServiceClient.getUserId(authorization);

        // 1. 사용자 알러지 정보 조회
        List<UserAllergyResponseDto> userAllergies = userServiceClient.getUserAllergies(authorization).getBody();

        // 2. 사용자 선호 재료 조회
        List<IngredientLikeResponseDto> likedIngredients = ingredientServiceClient.findUserLikeIngredientList(authorization).getBody();

        // 알러지에 해당하는 재료는 제외한 재료 목록 생성
        List<Long> safeIngredientIds = likedIngredients.stream()
                .filter(likedIngredient ->
                        userAllergies.stream().noneMatch(allergy -> allergy.getCommonCodeNum().equals(likedIngredient.getAllergyNum())))
                .map(IngredientLikeResponseDto::getId)
                .collect(Collectors.toList());
        
        // 사용자 선호 재료 기반 레시피 추천
        List<RecipeRecommendResponseDto> recommendedRecipes = recipeService.getRecipesByIngredients(safeIngredientIds);

        return ResponseEntity.status(HttpStatus.OK).body(recommendedRecipes);
    }

    @PostMapping("/list")
    public List<RecipeResponseDto> getRecipeList(@RequestBody List<Long> recipeIds) {
        // 1. 레시피 아이디 리스트에 해당하는 레시피들을 조회
        List<Recipe> recipes = recipeRepository.findByIdIn(recipeIds);

        // 2. 조회된 레시피들을 RecipeResponseDto로 변환하여 반환
        return recipes.stream()
                .map(recipe -> RecipeResponseDto.builder()
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
                .collect(Collectors.toList());
    }



    private String searchTypo(String query) {
        List<String> recipeNames = recipeRepository.findAllRecipeNames(); // DB에서 모든 레시피 이름 가져오기
        return getMostSimilarWord(query, recipeNames);
    }

    private String getMostSimilarWord(String query, List<String> wordDictionary) {
        String closestWord = query;
        int minDistance = Integer.MAX_VALUE;

        for (String word : wordDictionary) {
            int distance = LevenshteinDistance.computeLevenshteinDistance(query, word);
            if (distance < minDistance) {
                minDistance = distance;
                closestWord = word;
            }
        }
        return closestWord;
    }

    @GetMapping("/autocomplete")
    public ResponseEntity<List<String>> autocompleteRecipe(
            @RequestParam("keyword") String keyword) {

        Pageable pageable = PageRequest.of(0, 5);  // 첫 페이지에서 최대 5개의 결과를 가져오도록 설정
        List<String> recipeSuggestions = recipeRepository.findRecipeNamesByKeyword(keyword, pageable);

        return ResponseEntity.status(HttpStatus.OK).body(recipeSuggestions);
    }

    // 날씨 기반 레시피 추천

}

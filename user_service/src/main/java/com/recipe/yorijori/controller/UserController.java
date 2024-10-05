package com.recipe.yorijori.controller;

import com.recipe.yorijori.client.RecipeServiceClient;
import com.recipe.yorijori.data.dto.rank.RankResponseDto;
import com.recipe.yorijori.data.dto.recipe.response.*;
import com.recipe.yorijori.data.dto.user.request.UserModifyRequestDto;
import com.recipe.yorijori.data.dto.user.request.UserSignUpDto;
import com.recipe.yorijori.data.dto.user.response.UserResponseDto;
import com.recipe.yorijori.repository.UserRepository;
import com.recipe.yorijori.service.JwtService;
import com.recipe.yorijori.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
@Slf4j
public class UserController {

    private final UserService userService;
    private final JwtService jwtService;
    private final RecipeServiceClient recipeServiceClient;

    @PostMapping("/sign-up")
    public String signUp(@RequestBody UserSignUpDto userSignUpDto) throws Exception {
        userService.signUp(userSignUpDto);
        return "회원가입 성공";
    }

    @GetMapping("/recipe")
    public ResponseEntity<?> getUserRecipe(HttpServletRequest request) {

        String accessToken = jwtService.extractAccessToken(request)
                .orElseThrow(() -> new IllegalArgumentException("AccessToken이 존재하지 않습니다."));

        String userEmail = jwtService.extractEmail(accessToken)
                .orElseThrow(() -> new IllegalArgumentException("유효하지 않은 AccessToken입니다."));

        Long userId = userService.getUserIdByEmail(userEmail);

        List<UserRecipeRegistResponseDto> userRecipeRegistResponseDto = recipeServiceClient.getUserRecipes(userId);

        return ResponseEntity.status(HttpStatus.OK).body(userRecipeRegistResponseDto);
    }

    @GetMapping("/like")
    public ResponseEntity<?> getUserRecipeLike(HttpServletRequest request) {

        String accessToken = jwtService.extractAccessToken(request)
                .orElseThrow(() -> new IllegalArgumentException("AccessToken이 존재하지 않습니다."));

        String userEmail = jwtService.extractEmail(accessToken)
                .orElseThrow(() -> new IllegalArgumentException("유효하지 않은 AccessToken입니다."));

        Long userId = userService.getUserIdByEmail(userEmail);

        List<UserRecipeLikeResponseDto> userRecipeRegistlikeResponseDto = recipeServiceClient.getUserLikeRecipes(userId);

        return ResponseEntity.status(HttpStatus.OK).body(userRecipeRegistlikeResponseDto);
    }

    @GetMapping("/scrap")
    public ResponseEntity<?> getUserRecipeScrap(HttpServletRequest request) {

        String accessToken = jwtService.extractAccessToken(request)
                .orElseThrow(() -> new IllegalArgumentException("AccessToken이 존재하지 않습니다."));

        String userEmail = jwtService.extractEmail(accessToken)
                .orElseThrow(() -> new IllegalArgumentException("유효하지 않은 AccessToken입니다."));

        Long userId = userService.getUserIdByEmail(userEmail);

        List<UserRecipeScrapResponseDto> userRecipeScrapResponseDto = recipeServiceClient.getUserScrapRecipes(userId);

        return ResponseEntity.status(HttpStatus.OK).body(userRecipeScrapResponseDto);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getUser(@PathVariable("userId") Long userId) {
        UserRecipeResponseDto userRecipeResponseDto = userService.getUserById(userId);
        return ResponseEntity.status(HttpStatus.OK).body(userRecipeResponseDto);
    }

    @GetMapping("/simple/{userId}")
    public UserSimpleResponseDto getSimpleUser(@PathVariable("userId") Long userId) {
        return userService.getSimpleUserById(userId);
    }

    @GetMapping("/id")
    public Long getUserId(@RequestHeader("Authorization") String authorization) {

        String accessToken = authorization.split(" ")[1];

        String userEmail = jwtService.extractEmail(accessToken)
                .orElseThrow(() -> new IllegalArgumentException("유효하지 않은 AccessToken입니다."));

        return userService.getUserIdByEmail(userEmail);
    }

    @PatchMapping("/user")
    public ResponseEntity<?> updateUserInfo(HttpServletRequest request, @RequestBody UserModifyRequestDto userModifyRequestDto) {

        String accessToken = jwtService.extractAccessToken(request)
                .orElseThrow(() -> new IllegalArgumentException("AccessToken이 존재하지 않습니다."));

        String userEmail = jwtService.extractEmail(accessToken)
                .orElseThrow(() -> new IllegalArgumentException("유효하지 않은 AccessToken입니다."));


        userService.updateUser(userEmail, userModifyRequestDto);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity<UserResponseDto> getUserInfo(HttpServletRequest request) {

        String accessToken = jwtService.extractAccessToken(request)
                .orElseThrow(() -> new IllegalArgumentException("AccessToken이 존재하지 않습니다."));

        String userEmail = jwtService.extractEmail(accessToken)
                .orElseThrow(() -> new IllegalArgumentException("유효하지 않은 AccessToken입니다."));

        UserResponseDto userDto = userService.getUserByEmail(userEmail);

        return ResponseEntity.ok(userDto);

    }

    @GetMapping("/user/{nickname}")
    public ResponseEntity<UserResponseDto> getOtherUserInfo(@PathVariable("nickname")String nickname) {

        String userEmail = userService.getEmailByNickname(nickname);
        UserResponseDto userDto = userService.getUserByEmail(userEmail);

        return ResponseEntity.ok(userDto);
    }

    // 유저 랭킹 조회
    @GetMapping("/rank")
    public ResponseEntity<?> getUserRank(
            @RequestParam("pageSize") int pageSize,
            @RequestParam("pageNumber") int pageNumber) {

        List<RankResponseDto> rankResponseDtoList = userService.getUserRank(pageSize, pageNumber);

        return ResponseEntity.status(HttpStatus.OK).body(rankResponseDtoList);
    }


}

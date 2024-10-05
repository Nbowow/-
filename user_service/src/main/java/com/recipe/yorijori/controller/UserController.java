    package com.recipe.yorijori.controller;

    import com.recipe.yorijori.client.RecipeServiceClient;
    import com.recipe.yorijori.data.domain.User;
    import com.recipe.yorijori.data.dto.rank.RankResponseDto;
    import com.recipe.yorijori.data.dto.recipe.response.*;
    import com.recipe.yorijori.data.dto.user.request.UserModifyRequestDto;
    import com.recipe.yorijori.data.dto.user.request.UserSignUpDto;
    import com.recipe.yorijori.data.dto.user.response.UserResponseDto;
    import com.recipe.yorijori.global.exception.Unauthorized;
    import com.recipe.yorijori.repository.UserRepository;
    import com.recipe.yorijori.service.JwtService;
    import com.recipe.yorijori.service.S3Uploader;
    import com.recipe.yorijori.service.UserService;
    import jakarta.servlet.http.HttpServletRequest;
    import lombok.RequiredArgsConstructor;
    import lombok.extern.slf4j.Slf4j;
    import org.springframework.http.HttpStatus;
    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.*;
    import jakarta.servlet.http.HttpServletResponse;
    import org.springframework.web.multipart.MultipartFile;


    import java.io.IOException;
    import java.util.HashMap;
    import java.util.List;
    import java.util.Map;

    @RestController
    @RequiredArgsConstructor
    @RequestMapping("/api/v1/users")
    @Slf4j
    public class UserController {

        private final UserService userService;
        private final UserRepository userRepository;
        private final JwtService jwtService;
        private final RecipeServiceClient recipeServiceClient;
        private final S3Uploader s3Uploader;

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

            for (UserRecipeLikeResponseDto likeRecipe : userRecipeRegistlikeResponseDto) {
                Long recipeUserId = likeRecipe.getUserId(); // 레시피 등록한 회원의 ID

                // userId를 통해 해당 유저 정보 (닉네임과 프로필 이미지) 조회
                User user = userRepository.findById(recipeUserId)
                        .orElseThrow(() -> new IllegalArgumentException("해당 사용자를 찾을 수 없습니다."));

                // 레시피에 사용자 정보 업데이트
                likeRecipe.setNickname(user.getNickname());
                likeRecipe.setProfileImage(user.getProfileImage());
            }

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

            for (UserRecipeScrapResponseDto scrapRecipe : userRecipeScrapResponseDto) {
                Long recipeUserId = scrapRecipe.getUserId(); // 레시피 등록한 회원의 ID

                // userId를 통해 해당 유저 정보 (닉네임과 프로필 이미지) 조회
                User user = userRepository.findById(recipeUserId)
                        .orElseThrow(() -> new IllegalArgumentException("해당 사용자를 찾을 수 없습니다."));

                // 레시피에 사용자 정보 업데이트
                scrapRecipe.setNickname(user.getNickname());
                scrapRecipe.setProfileImage(user.getProfileImage());
            }

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


        @PostMapping("/refresh-token")
        public ResponseEntity<?> refreshAccessToken(HttpServletRequest request, HttpServletResponse response) {
            // 요청 헤더에서 리프레시 토큰 추출
            String refreshToken = jwtService.extractRefreshToken(request)
                    .filter(jwtService::isTokenValid)
                    .orElseThrow(() -> new Unauthorized());

            // 리프레시 토큰이 DB에 존재하고, 일치하는 경우 처리
            return userRepository.findByRefreshToken(refreshToken)
                    .map(user -> {
                        // 새로운 액세스 토큰 생성
                        String newAccessToken = jwtService.createAccessToken(user.getEmail());

                        // 새로운 리프레시 토큰도 재발급
                        String newRefreshToken = jwtService.createRefreshToken();
                        user.updateRefreshToken(newRefreshToken);  // DB에 리프레시 토큰 업데이트
                        userRepository.saveAndFlush(user);

                        // 응답 헤더에 새로운 액세스 토큰과 리프레시 토큰을 담아 전송
                        jwtService.sendAccessAndRefreshToken(response, newAccessToken, newRefreshToken);

                        // 필요 시, 바디에도 토큰을 반환 (JSON 형태)
                        Map<String, String> tokens = new HashMap<>();
                        tokens.put("accessToken", newAccessToken);
                        tokens.put("refreshToken", newRefreshToken);

                        return ResponseEntity.ok(tokens);
                    })
                    .orElseThrow(() -> new Unauthorized());
        }



        @PostMapping("/update-profile")
        public ResponseEntity<?> uploadFile(HttpServletRequest request, @RequestParam("file") MultipartFile file) {
            String accessToken = jwtService.extractAccessToken(request)
                    .orElseThrow(() -> new IllegalArgumentException("AccessToken이 존재하지 않습니다."));

            String userEmail = jwtService.extractEmail(accessToken)
                    .orElseThrow(() -> new IllegalArgumentException("유효하지 않은 AccessToken입니다."));

            Long userId=userService.getUserIdByEmail(userEmail);

            try {
                // 파일 업로드 후 S3 URL 반환
                String fileUrl = s3Uploader.saveFile(file);


                userService.updateUserProfileImage(userId, fileUrl);
                return new ResponseEntity<>(HttpStatus.OK);
            } catch (IOException e) {
                return ResponseEntity.status(500).body("파일 업로드 실패: " + e.getMessage());
            }
        }



    }

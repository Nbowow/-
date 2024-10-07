package com.recipe.yorijori.service;

import com.recipe.yorijori.client.RecipeServiceClient;
import com.recipe.yorijori.client.SocialServiceClient;
import com.recipe.yorijori.data.domain.User;
import com.recipe.yorijori.data.dto.rank.RankResponseDto;
import com.recipe.yorijori.data.dto.recipe.response.*;
import com.recipe.yorijori.data.dto.user.request.UserModifyRequestDto;
import com.recipe.yorijori.data.dto.user.request.UserSignUpDto;
import com.recipe.yorijori.data.dto.user.response.FollowerResponseDto;
import com.recipe.yorijori.data.dto.user.response.FollowingResponseDto;
import com.recipe.yorijori.data.dto.user.response.UserResponseDto;
import com.recipe.yorijori.data.enums.Role;
import com.recipe.yorijori.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RecipeServiceClient recipeServiceClient;
    private final SocialServiceClient socialServiceClient;

    public void signUp(UserSignUpDto userSignUpDto) throws Exception {

        if (userRepository.findByEmail(userSignUpDto.getEmail()).isPresent()) {
            throw new Exception("이미 존재하는 이메일입니다.");
        }

        if (userRepository.findByNickname(userSignUpDto.getNickname()).isPresent()) {
            throw new Exception("이미 존재하는 닉네임입니다.");
        }

        User user = User.builder()
                .email(userSignUpDto.getEmail())
                .password(userSignUpDto.getPassword())
                .nickname(userSignUpDto.getNickname())
                .role(Role.USER)
                .build();

        user.passwordEncode(passwordEncoder);
        userRepository.save(user);
    }


    // 이메일을 기반으로 User 정보를 조회하고 DTO로 변환
    public UserResponseDto getUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));


        // User 객체를 UserDto로 변환하여 반환
        return new UserResponseDto(
                user.getUserId(),
                user.getEmail(),
                user.getNickname(),
                user.getProfileImage(),
                user.getName(),
                user.getScore(),
                user.getSummary(), // 추가된 회원 한줄 소개
                mapFollowersToDto(user.getUserId()), // 추상 followers 정보
                mapFollowingsToDto(user.getUserId()) // 추상 followings 정보
        );
    }

    public UserRecipeResponseDto getUserById(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        List<RecipeResponseDto> recipeList = recipeServiceClient.getRecipes(userId);

        ModelMapper modelMapper = new ModelMapper();
        UserRecipeResponseDto userRecipeResponseDto = modelMapper.map(user, UserRecipeResponseDto.class);
        userRecipeResponseDto.setRecipes(recipeList);

        return userRecipeResponseDto;
    }



    public List<FollowerResponseDto> mapFollowersToDto(Long userId) {
        List<Long> followerIds = socialServiceClient.getFollowers(userId);
        return followerIds.stream().map(followerId -> {
            User follower = userRepository.findById(followerId)
                    .orElseThrow(() -> new IllegalArgumentException("팔로워를 찾을 수 없습니다."));
            return new FollowerResponseDto(
                    follower.getUserId(),
                    follower.getNickname(),
                    follower.getProfileImage()
            );
        }).collect(Collectors.toList());
    }

    public List<FollowingResponseDto> mapFollowingsToDto(Long userId) {
        List<Long> followingIds = socialServiceClient.getFollowings(userId);
        return followingIds.stream().map(followingId -> {
            User following = userRepository.findById(followingId)
                    .orElseThrow(() -> new IllegalArgumentException("팔로잉 사용자를 찾을 수 없습니다."));
            return new FollowingResponseDto(
                    following.getUserId(),
                    following.getNickname(),
                    following.getProfileImage()
            );
        }).collect(Collectors.toList());
    }

    public Long getUserIdByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
        return user.getUserId();
    }

    public String getEmailByNickname(String nickname) {
        User user = userRepository.findByNickname(nickname)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
        return user.getEmail();
    }

    public UserSimpleResponseDto getSimpleUserById(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        return UserSimpleResponseDto.builder()
                .userId(user.getUserId())
                .profileImage(user.getProfileImage())
                .nickname(user.getNickname())
                .summary(user.getSummary())
                .build();
    }

    public void updateUser(String email, UserModifyRequestDto userModifyRequestDto) {
        // Retrieve the user by their email
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자를 찾을 수 없습니다."));

        // Update user fields with the information from UserModifyRequestDto
        if (userModifyRequestDto.getNickname() != null) {
            user.setNickname(userModifyRequestDto.getNickname());
        }
        if (userModifyRequestDto.getSummary() != null) {
            user.setSummary(userModifyRequestDto.getSummary());
        }

        // Save the updated user back to the repository
        userRepository.save(user);
    }

    public List<RankResponseDto> getUserRank(int pageSize, int pageNumber) {

        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize, Sort.by(Sort.Direction.DESC, "score"));

        // 유저 데이터를 점수 순으로 페이징 처리하여 가져오기
        Page<User> usersPage = userRepository.findAll(pageable);

        // 유저 엔티티를 RankResponseDto로 변환
        return usersPage.getContent().stream()
                .map(user -> {
                    RankResponseDto rankResponseDto = new RankResponseDto();
                    rankResponseDto.setNickname(user.getNickname());
                    rankResponseDto.setImage(user.getProfileImage());
                    rankResponseDto.setScore(user.getScore());

                    // 해당 유저의 등록된 레시피 개수
                    List<UserRecipeRegistResponseDto> userRecipes = recipeServiceClient.getUserRecipes(user.getUserId());
                    rankResponseDto.setRecipeCount((long) userRecipes.size());

                    // 해당 유저의 등록된 레시피에 좋아요 누른 갯수
                    List<UserRecipeLikeResponseDto> userRecipeLikes = recipeServiceClient.getUserLikeRecipes(user.getUserId());
                    rankResponseDto.setLikeCount((long) userRecipeLikes.size());

                    return rankResponseDto;
                })
                .collect(Collectors.toList());
    }

    public void updateUserProfileImage(Long userId, String profileImageUrl) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자를 찾을 수 없습니다."));

        user.setProfileImage(profileImageUrl);  // 프로필 이미지 URL 업데이트
        userRepository.save(user);  // 변경사항 저장
    }
}
package com.recipe.yorijori.service;

import com.recipe.yorijori.client.RecipeServiceClient;
import com.recipe.yorijori.client.SocialServiceClient;
import com.recipe.yorijori.data.domain.User;
import com.recipe.yorijori.data.dto.recipe.response.RecipeResponseDto;
import com.recipe.yorijori.data.dto.recipe.response.UserRecipeResponseDto;
import com.recipe.yorijori.data.dto.user.request.UserSignUpDto;
import com.recipe.yorijori.data.dto.user.response.FollowerResponseDto;
import com.recipe.yorijori.data.dto.user.response.FollowingResponseDto;
import com.recipe.yorijori.data.dto.user.response.UserResponseDto;
import com.recipe.yorijori.data.enums.Role;
import com.recipe.yorijori.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
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
}
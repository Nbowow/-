package com.recipe.social_service.service;

import com.recipe.social_service.client.UserServiceClient;
import com.recipe.social_service.data.dto.user.response.UserResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SocialService {

    private final UserServiceClient userServiceClient;

    public UserResponseDto findUserByUserNickname(String nickname) {

        UserResponseDto userResponseDto = userServiceClient.getUser(nickname);

        return userResponseDto;
    }
}

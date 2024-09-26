package com.example.social_service.service;

import com.example.social_service.client.UserServiceClient;
import com.example.social_service.data.dto.user.UserResponseDto;
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

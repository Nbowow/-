package com.recipe.social_service.client;

import com.recipe.social_service.data.dto.user.response.UserResponseDto;
import com.recipe.social_service.data.dto.user.response.UserResponseDto2;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "user-service")
public interface UserServiceClient {

    @GetMapping("/api/v1/users/{nickname}/test")
    UserResponseDto getUser(@PathVariable String nickname);

    @GetMapping("/api/v1/users/image/{userId}")
    UserResponseDto2 getUserImage(@PathVariable("userId") Long userId);
}

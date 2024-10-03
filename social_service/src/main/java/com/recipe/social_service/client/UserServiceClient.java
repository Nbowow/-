package com.recipe.social_service.client;

import com.recipe.social_service.data.dto.user.response.UserResponseDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "user-service")
public interface UserServiceClient {

    @GetMapping("/api/v1/users/{nickname}/test")
    UserResponseDto getUser(@PathVariable String nickname);
}

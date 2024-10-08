package com.recipe.social_service.global.exception;

public class FollowNotFoundException extends YorijoriException {
    private static final String MESSAGE = "Follow relationship does not exist.";
    public FollowNotFoundException() {
        super(MESSAGE);
    }

    @Override
    public int getStatusCode() {
        return 502;
    }
}

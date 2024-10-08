package com.recipe.social_service.global.exception;

public class FollowAlreadyExistsException extends YorijoriException {
    private static final String MESSAGE = "User is already being followed.";
    public FollowAlreadyExistsException() {
        super(MESSAGE);
    }

    @Override
    public int getStatusCode() {
        return 502;
    }
}

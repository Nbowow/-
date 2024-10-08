package com.recipe.yorijori.global.exception;

public class UserNotFoundException  extends YorijoriException{
    private static final String MESSAGE = "User not found with id";
    public UserNotFoundException() {
        super(MESSAGE);
    }

    @Override
    public int getStatusCode() {
        return 502;
    }
}

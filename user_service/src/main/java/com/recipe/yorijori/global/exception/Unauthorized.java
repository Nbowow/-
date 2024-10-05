package com.recipe.yorijori.global.exception;

public class Unauthorized extends YorijoriException{
    private static final String MESSAGE = "액세스 토큰이 만료되었습니다 리프레쉬토큰이 필요합니다.";
    public Unauthorized() {
        super(MESSAGE);
    }

    @Override
    public int getStatusCode() {
        return 401;
    }
}

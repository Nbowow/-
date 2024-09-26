package com.recipe.yorijori.data.userinfo;


import java.util.Map;

public abstract class OAuth2UserInfo {

    protected Map<String, Object> attributes;

    public OAuth2UserInfo(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    public abstract String getId();

    public abstract String getNickname();

    public abstract String getImageUrl();

    public abstract String getEmail();  // 이메일 정보를 추가

    public abstract String getName();    // name 정보를 추가

}

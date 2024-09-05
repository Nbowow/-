package com.recipe.yorijori.data.domain;


import com.recipe.yorijori.data.enums.Role;
import com.recipe.yorijori.data.enums.SocialType;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.crypto.password.PasswordEncoder;


@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "Users")
@ToString
@Builder
public class User extends BaseTimeEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @Column(name = "user_email")
    private String email;

    @Column(name = "user_nickname")
    private String nickname;

    @Column(name = "user_image")
    private String profileImage;

    @Column(name = "user_age")
    private String age;

    @Column(name = "user_gender")
    private String gender;

    @Column(name = "user_name")
    private String name;

    @Column(name = "user_birthday")
    private String birthday;

    @Builder.Default
    @Column(name = "user_status")
    private boolean status = true;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Enumerated(EnumType.STRING)
    private SocialType socialType;

    private String socialId;

    private String password; // 비밀번호

    private String refreshToken;



    public void authorizeUser() {
        this.role = Role.USER;
    }

    // 비밀번호 암호화 메소드
    public void passwordEncode(PasswordEncoder passwordEncoder) {
        this.password = passwordEncoder.encode(this.password);
    }

    public void updateRefreshToken(String updateRefreshToken) {
        this.refreshToken = updateRefreshToken;
    }
}
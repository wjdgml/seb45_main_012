package com.green.greenEarthForUs.user.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserPostDto { // 가입

    //private Long userId;

    private String username;

    private String password;

    private String passwordQuestion;

    private String passwordAnswer;

    private String imageUrl;

}

package com.green.greenEarthForUs.user.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class UserPatchDto {

    private String userName;

    private String password;

    private String passwordQuestion;

    private String passwordAnswer;

    private String imageUrl;
}
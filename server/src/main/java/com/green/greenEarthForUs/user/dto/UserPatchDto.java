package com.green.greenEarthForUs.user.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class UserPatchDto {

    private String username;

    private String password;

    private String passwordQuestion;

    private String passwordAnswer;

    private String ImageFileName;

    private byte[] fileImage;
}
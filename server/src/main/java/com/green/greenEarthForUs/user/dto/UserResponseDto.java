package com.green.greenEarthForUs.user.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
@Getter @Setter
public class UserResponseDto {

    private Long userId;

    private String userName;

    private String userRole;

    private String userGrade;

    private String passwordQuestion;

    private LocalDateTime createdAt;

    private String imageUrl;

}

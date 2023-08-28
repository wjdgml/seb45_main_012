package com.green.greenEarthForUs;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class TestUser {
    long id;
    String userId;
    String username;
    String password;
    String userStatus;
    String userGrade;
    String passwordQuestion;
    String passwordAnswer;
    LocalDateTime createdAt;

}

package com.green.greenEarthForUs;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
@Getter
@Setter
public class TestPost {
    long id;
    long userId;
    String type;
    String title;
    String body;
    String open;
    LocalDateTime createdAt;


}

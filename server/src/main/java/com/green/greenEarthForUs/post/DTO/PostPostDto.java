package com.green.greenEarthForUs.post.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class PostPostDto { // 생성

    private Long userId;

    private String type;

    private String title;

    private String body;

    //private String imagePath;

    private String writer;

    private Boolean open;
}

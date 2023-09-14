package com.green.greenEarthForUs.post.DTO;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
public class PostPostDto { // 생성

    private String type;

    private String title;

    private String body;

    private Boolean open;

    private String imageUrls;

    public Boolean isOpen() {
        return open != null && open; // open 필드가 null인 경우나 false인 경우에 구현 이렇게 해주어야함
    }
}


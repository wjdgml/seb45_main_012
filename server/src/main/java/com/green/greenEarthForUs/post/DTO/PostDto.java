package com.green.greenEarthForUs.post.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class PostDto { // 엔티티 조회, 내용 수정
    private String type;

    private String title;

    private String body;

    private String writer;

    //private String imagePath;

    private Boolean open;
}

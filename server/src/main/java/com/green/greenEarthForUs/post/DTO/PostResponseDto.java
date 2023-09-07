package com.green.greenEarthForUs.post.DTO;


import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
@Getter @Setter
public class PostResponseDto {

    private Long postId;

    private Long userId;

    private String type;

    private String title;

    private String body;

    private String writer;

    private String open;

    //private String imagePath;

    private LocalDateTime createdAt;

}

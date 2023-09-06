package com.green.greenEarthForUs.post.DTO;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter @Setter
public class PostPatchDto {
    private Long id;

    private String userId;

    private String type;

    private String title;

    private String writer;

    //private String imagePath;

    private String body;

    private Boolean open;

    private LocalDateTime createdAt;
}

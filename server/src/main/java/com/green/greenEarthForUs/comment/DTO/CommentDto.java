package com.green.greenEarthForUs.comment.DTO;

import lombok.Getter;
import lombok.Setter;


import java.time.LocalDateTime;

@Getter
@Setter
public class CommentDto {

    private Long id;

    private String body;

    private Long postId;

    private Long userId;

    private LocalDateTime createdAt;
}


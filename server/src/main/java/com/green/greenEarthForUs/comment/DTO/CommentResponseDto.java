package com.green.greenEarthForUs.comment.DTO;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
@Getter
@Setter
@AllArgsConstructor
public class CommentResponseDto {

    private Long commentId;

    private Long userId;

    private Long postId;

    private String body;

    private String writer;

    private LocalDateTime createdAt;

}

package com.green.greenEarthForUs.post.DTO;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter @Setter
@NoArgsConstructor
public class PostPatchDto {
    private Long id;

    private String userId;

    private String type;

    private String title;

    private String bodyImageFileName;

    private byte[] bodyImage;

    private String body;

    private Boolean open;

    private LocalDateTime createdAt;
}

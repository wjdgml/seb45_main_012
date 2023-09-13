package com.green.greenEarthForUs.post.DTO;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter @Setter
@NoArgsConstructor
public class PostPatchDto {
    private Long id;

    private String userId;

    private String type;

    private String title;

    private List<String> imageUrls;

    private String body;

    private Boolean open;

    private LocalDateTime createdAt;
}

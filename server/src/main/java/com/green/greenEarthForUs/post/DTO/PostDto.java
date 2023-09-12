package com.green.greenEarthForUs.post.DTO;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
public class PostDto { // 엔티티 조회, 내용 수정

    private String type;

    private String title;

    private String body;

    private String imageUrl;

    private Boolean open;

}

package com.green.greenEarthForUs.post.DTO;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter @Setter
@NoArgsConstructor
public class PostDto { // 엔티티 조회, 내용 수정

    private String type;

    private String title;

    private String body;

    private List<String> imageUrls;

    private Boolean open;

}

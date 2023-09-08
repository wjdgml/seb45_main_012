package com.green.greenEarthForUs.post.Mapper;

import com.green.greenEarthForUs.post.DTO.PostPostDto;
import com.green.greenEarthForUs.post.DTO.PostResponseDto;
import com.green.greenEarthForUs.post.Entity.Post;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PostMapper {

    PostResponseDto postToPostResponseDto(Post post);

    Post postPostDtoToPost(PostPostDto postPostDto);
}





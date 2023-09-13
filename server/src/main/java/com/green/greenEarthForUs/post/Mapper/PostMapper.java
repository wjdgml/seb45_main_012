package com.green.greenEarthForUs.post.Mapper;

import com.green.greenEarthForUs.post.DTO.PostPostDto;
import com.green.greenEarthForUs.post.DTO.PostResponseDto;
import com.green.greenEarthForUs.post.Entity.Post;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PostMapper {
    @Mapping(source = "user.userId", target = "userId")
    PostResponseDto postToPostResponseDto(Post post);

    Post postPostDtoToPost(PostPostDto postPostDto);
}





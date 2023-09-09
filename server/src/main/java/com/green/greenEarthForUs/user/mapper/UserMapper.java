package com.green.greenEarthForUs.user.mapper;

import com.green.greenEarthForUs.user.Entity.User;
import com.green.greenEarthForUs.user.dto.UserPostDto;
import com.green.greenEarthForUs.user.dto.UserResponseDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    User userPostDtoToUser(UserPostDto userPostDto);

    UserResponseDto userToUserResponseDto(User user);

}

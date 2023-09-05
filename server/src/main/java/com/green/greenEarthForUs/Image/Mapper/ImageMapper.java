package com.green.greenEarthForUs.Image.Mapper;

import com.green.greenEarthForUs.Image.DTO.ImageDto;
import com.green.greenEarthForUs.Image.Entity.Image;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface ImageMapper {
    Image imageDtoPostToImage(ImageDto.Post requestBody);
    ImageDto.Response imageToImageResponseDto(Image image);
}

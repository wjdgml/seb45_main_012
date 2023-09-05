package com.green.greenEarthForUs.Image.Controller;

import com.green.greenEarthForUs.Image.DTO.ImageDto;
import com.green.greenEarthForUs.Image.Entity.Image;
import com.green.greenEarthForUs.Image.Mapper.ImageMapper;
import com.green.greenEarthForUs.Image.Service.ImageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/image")
public class ImageController {

    private final ImageService imageService;
    private final ImageMapper mapper;
    public ImageController(ImageService imageService,
                           ImageMapper mapper){
        this.imageService = imageService;
        this.mapper = mapper;
    }


    @PostMapping("/api")
    public ResponseEntity<ImageDto.Response> imageUpload(@RequestParam(name = "image") MultipartFile image) throws IOException {

        LocalDateTime now = LocalDateTime.now();

        ImageDto.Post imageDto = ImageDto.Post.builder()
                .originName(image.getOriginalFilename())
                .uniqueName(image.getOriginalFilename()+now)
                .data(image.getBytes())
                .build();

        Image result = imageService.saveImage(mapper.imageDtoPostToImage(imageDto));

        return new ResponseEntity<ImageDto.Response>(mapper.imageToImageResponseDto(result), HttpStatus.CREATED);
    }

    @GetMapping("/api/{image_id}")
    public ResponseEntity<ImageDto.Response> getImage(@PathVariable("image_id") long imageId){
        Image image = imageService.findImage(imageId);

        return ResponseEntity.ok(mapper.imageToImageResponseDto(image));
    }

    @DeleteMapping("/api/{image_id}")
    public ResponseEntity deleteImage(@PathVariable("image_id") long imageId){
        imageService.deleteImage(imageId);
        return ResponseEntity.noContent().build();
    }



}

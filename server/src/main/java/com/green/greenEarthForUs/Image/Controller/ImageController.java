package com.green.greenEarthForUs.Image.Controller;

import com.green.greenEarthForUs.Image.Service.ImageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/image")
public class ImageController {

    private ImageService imageService;

    public ImageController(ImageService imageService){
        this.imageService = imageService;
    }

    @PostMapping("/api")
    public ResponseEntity<String> imageUpload(@RequestParam(name = "image") MultipartFile image) throws IOException {
        String imageUrl = imageService.uploadImage(image);

        return new ResponseEntity<String>(imageUrl, HttpStatus.OK);
    }

    @DeleteMapping("/{image_url}")
    public ResponseEntity imageDelete(@PathVariable("image_url") String imageUrl) throws Exception {
        imageService.deleteImage(imageUrl);
        return ResponseEntity.noContent().build();
    }


}

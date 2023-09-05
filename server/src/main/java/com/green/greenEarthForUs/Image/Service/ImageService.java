package com.green.greenEarthForUs.Image.Service;

import com.green.greenEarthForUs.Exception.BusinessLogicException;
import com.green.greenEarthForUs.Exception.ExceptionCode;
import com.green.greenEarthForUs.Image.Entity.Image;
import com.green.greenEarthForUs.Image.Repository.ImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class ImageService {
    private final ImageRepository imageRepository;

    public Image saveImage(Image image) throws IOException {

        return imageRepository.save(image);
    }

    public Image findImage(long imageId) {
       return imageRepository.findById(imageId)
               .orElseThrow(() -> new BusinessLogicException(ExceptionCode.IMAGE_NOT_FOUND));
    }

    public void deleteImage(long imageId){
        imageRepository.delete(findImage(imageId));
    }


}

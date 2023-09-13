package com.green.greenEarthForUs.Image.Service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import java.net.URL;
import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

@Service
public class ImageService {

    private final AmazonS3 amazonS3;

    @Value("${aws.s3.bucketName}")
    private String bucketName;

    public ImageService(AmazonS3 amazonS3){
        this.amazonS3 = amazonS3;
    }


    public String uploadImage(MultipartFile file) throws IOException{
        String filePath = "images/";
        String fileName = filePath + UUID.randomUUID().toString() + "-" + file.getOriginalFilename();

        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType(file.getContentType());
        metadata.setContentLength(file.getSize());

        InputStream inputStream = file.getInputStream();
        amazonS3.putObject(new PutObjectRequest(bucketName, fileName, inputStream, metadata));

        return amazonS3.getUrl(bucketName, fileName).toString();
    }

    public void deleteImage(String imageUrl) throws Exception {
        imageUrl = "https://"+imageUrl;
        URL url = new URL(imageUrl);
        String host = url.getHost();
        String path = url.getPath();

        String filePath = path.substring(bucketName.length()+2);
        amazonS3.deleteObject(new DeleteObjectRequest(bucketName, filePath));
    }

}

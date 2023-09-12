package com.green.greenEarthForUs.Image.Service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AmazonS3Config {

    @Bean
    public AmazonS3 amazonS3() {
        return AmazonS3Client.builder()
                .withRegion("ap-northeast-2")
                .build();
    }

}

package com.green.greenEarthForUs.Image.DTO;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.bytebuddy.implementation.bind.annotation.BindingPriority;
import org.springframework.stereotype.Service;

@Getter
@Setter
@NoArgsConstructor
public class ImageDto {
    @Getter
    @Builder
    public static class Post{
     private String originName;
     private String uniqueName;
     private byte[] data;
    }
    @Getter
    @Builder
    public static class Response{
        private String originName;
        private String uniqueName;
        private byte[] data;
    }

}

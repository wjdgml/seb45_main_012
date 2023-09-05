package com.green.greenEarthForUs.Image.Entity;

import com.green.greenEarthForUs.Exception.BusinessLogicException;
import com.green.greenEarthForUs.Exception.ExceptionCode;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.UUID;

@Getter
@NoArgsConstructor
@Entity
@Data
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
     @Column
    private String originName;
    @Column
    private String uniqueName;
    @Column
    private byte[] data;

    @Builder
    public Image(String originName, String uniqueName, byte[] data){
        this.originName = originName;
        this.uniqueName = uniqueName;
        this.data = data;
    }


}

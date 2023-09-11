package com.green.greenEarthForUs.Image.Repository;

import com.green.greenEarthForUs.Image.Entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Long> {

}

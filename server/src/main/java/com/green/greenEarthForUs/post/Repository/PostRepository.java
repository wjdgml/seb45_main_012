package com.green.greenEarthForUs.post.Repository;

import com.green.greenEarthForUs.post.Entity.Post;
import com.green.greenEarthForUs.user.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    // 공개 게시물
    //List<Post> findByOpenTrue();

    // 비공개 게시물
    //List<Post> findByOpenFalse();

    List<Post> findByType(String typeName);

    List<Post> findByUser(User user);
}

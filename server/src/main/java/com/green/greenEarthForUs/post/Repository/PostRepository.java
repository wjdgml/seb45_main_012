package com.green.greenEarthForUs.post.Repository;

import com.green.greenEarthForUs.post.Entity.Post;
import com.green.greenEarthForUs.user.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    List<Post> findByType(String typeName);

    List<Post> findByUser(User user);


}

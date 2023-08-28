package com.green.greenEarthForUs;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/post")
public class exampleController {
    String userId = "냥이";
    String username = "test";
    String password = "testPassword";
    String passwordQuestion = "기억에 남는 추억의 장소는?";
    String passwordAnswer = "someWhereOverTheRainbow";

    @PostMapping("/{user_id}")
    public ResponseEntity postUser() {
        TestPost post = new TestPost();

        post.setId(1L);
        post.setType("free");
        post.setTitle("안녕하세요! 가입인사드립니다.");
        post.setBody("안녕하세요. 처음 가입했습니다. 잘 부탁드립니다.");
        post.setOpen("open");
        post.setCreatedAt(LocalDateTime.now());


        return new ResponseEntity(post, HttpStatus.CREATED);
    }

    @GetMapping("/")
    public ResponseEntity getUser(){
        TestPost post = new TestPost();

        post.setId(1L);
        post.setUserId(1L);
        post.setType("free");
        post.setTitle("안녕하세요! 가입인사드립니다.");
        post.setBody("안녕하세요. 처음 가입했습니다. 잘 부탁드립니다.");
        post.setOpen("open");
        post.setCreatedAt(LocalDateTime.now());


        return new ResponseEntity(post, HttpStatus.OK);
    }

    @GetMapping("/{type_name}")
    public ResponseEntity getUserS(){
        TestPost post = new TestPost();

        post.setId(1L);
        post.setUserId(1L);
        post.setType("free");
        post.setTitle("안녕하세요! 가입인사드립니다.");
        post.setBody("안녕하세요. 처음 가입했습니다. 잘 부탁드립니다.");
        post.setOpen("open");
        post.setCreatedAt(LocalDateTime.now());

        TestPost post1 = new TestPost();

        post1.setId(4L);
        post1.setUserId(1L);
        post1.setType("show");
        post1.setTitle("이번 주에는 장보러 갈때마다 장바구니를 들고갔어요.");
        post1.setBody("확실히 장바구니를 들고가니까 봉투를 적게 사용하게 되더라구요. 너무 좋은 것 같아요!");
        post1.setOpen("open");
        post1.setCreatedAt(LocalDateTime.now());

        List<TestPost> postList = new ArrayList<>();
        postList.add(post);
        postList.add(post1);

        return new ResponseEntity(postList, HttpStatus.OK);
    }




    @PatchMapping("/{user_id}/{post_id}")
    public ResponseEntity patchUser(){
        TestPost post = new TestPost();

        post.setId(1L);
        post.setType("free");
        post.setTitle("안녕하세요! 가입인사드립니다 ^^");
        post.setBody("안녕하세요. 처음 가입했습니다. 잘 부탁드립니다 ^^");
        post.setOpen("open");
        post.setCreatedAt(LocalDateTime.now());


        return new ResponseEntity(post, HttpStatus.OK);
    }

    @DeleteMapping("/{user_id}/{post_id}")
    public ResponseEntity deleteUser(){
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }


}

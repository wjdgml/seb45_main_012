//package com.green.greenEarthForUs;
//
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.time.LocalDateTime;
//
//@RestController
//@RequestMapping("/user/")
//public class TestController {
//
//    @PostMapping
//    public ResponseEntity<TestUser> postUser(){
//        TestUser user = new TestUser();
//        user.setUserId("testID");
//        user.setUsername("test");
//        user.setUserStatus("USER");
//        user.setUserGrade("seed");
//        user.setPasswordQuestion("Test Question");
//        user.setCreatedAt(LocalDateTime.now());
//
//        return new ResponseEntity<>(user, HttpStatus.CREATED);
//    }
//
//    @GetMapping("{user_id}")
//    public ResponseEntity<TestUser> getUser(){
//        TestUser user = new TestUser();
//        user.setUserId("testID");
//        user.setUsername("test");
//        user.setUserStatus("USER");
//        user.setUserGrade("seed");
//        user.setPasswordQuestion("Test Question");
//        user.setCreatedAt(LocalDateTime.now());
//
//        return new ResponseEntity<>(user, HttpStatus.OK);
//    }
//
//    @PatchMapping("{user_id}")
//    public ResponseEntity<TestUser> patchUser(){
//        TestUser user = new TestUser();
//        user.setUserId("testID");
//        user.setUsername("test123");
//        user.setUserStatus("USER");
//        user.setUserGrade("flower");
//        user.setPasswordQuestion("Test Question");
//        user.setCreatedAt(LocalDateTime.now());
//
//        return new ResponseEntity<>(user, HttpStatus.OK);
//    }
//
//    @DeleteMapping("{user_id}")
//    public ResponseEntity deleteUser(){
//        return ResponseEntity.noContent().build();
//    }
//
//
//
//}

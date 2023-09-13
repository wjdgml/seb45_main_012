package com.green.greenEarthForUs.user.controller;


import com.green.greenEarthForUs.Image.Service.ImageService;
import com.green.greenEarthForUs.user.Entity.User;
import com.green.greenEarthForUs.user.dto.UserAnswerDto;
import com.green.greenEarthForUs.user.dto.UserPatchDto;
import com.green.greenEarthForUs.user.dto.UserPostDto;
import com.green.greenEarthForUs.user.dto.UserResponseDto;
import com.green.greenEarthForUs.user.mapper.UserMapper;
import com.green.greenEarthForUs.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/user")
public class UserController { // 이미지 데이터를 바이너리 형태로 저장 -< DB에 사진 그냥 넣는거

    private UserService userService;
    private UserMapper mapper;
    private final ImageService imageService;
    @Autowired
    public UserController(UserService userService, UserMapper mapper, ImageService imageService) {
        this.userService = userService;
        this.mapper = mapper;
        this.imageService = imageService;
    }

    // 사용자 등록
    @PostMapping
    public ResponseEntity<UserResponseDto> createUser(@RequestPart(value = "image", required = false) MultipartFile image,
                                                      @RequestPart(value = "json") UserPostDto userPostDto) throws IOException {


        User createUser = userService.createUser(userPostDto);

        if(image != null){
            String imageUrl = imageService.uploadImage(image);
            createUser.setImageUrl(imageUrl);
        }

        UserResponseDto responseDto = mapper.userToUserResponseDto(createUser);

        return ResponseEntity.status(HttpStatus.CREATED).body(responseDto);
    }

    // 해당 사용자 정보 확인
    @GetMapping("/{user-id}")
    public ResponseEntity<UserResponseDto> getUser(@PathVariable(name = "user-id") Long userId) {
        User user = userService.getUser(userId);
        UserResponseDto responseDto = mapper.userToUserResponseDto(user);

        return ResponseEntity.ok(responseDto);
    }

    //사용자 질문 답변 확인
    @GetMapping("/{user-id}/verify")
    public ResponseEntity<String> verifyAnswer(@PathVariable(name = "user-id") Long userId,
                                               @RequestPart(value = "String") String answer) {
        boolean isAnswerCorrect = userService.verifyAnswer(userId, answer);

        // 입력한 답변과 실제 저장된 답변이 같아야 함.
        if (isAnswerCorrect) {
            return ResponseEntity.ok("입력한 답변이 일치합니다.");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("입력한 답변이 일치하지 않습니다.");
        }
    }

    // 사용자 정보 변경
    @PatchMapping("/{user-id}")
    public ResponseEntity<UserResponseDto> updateUser(@PathVariable(name = "user-id") Long userId,
                                                      @RequestPart(value = "image", required = false) MultipartFile image,
                                                      @RequestPart(value = "json") UserPatchDto userPatchDto) throws IOException {

        User updateUser = userService.updateUser(userId, userPatchDto);
        if(image!=null) {
            String imageUrl = imageService.uploadImage(image);
            updateUser.setImageUrl(imageUrl);
        }

        UserResponseDto responseDto = mapper.userToUserResponseDto(updateUser);

        return ResponseEntity.ok(responseDto);
    }

    //사용자 정보 삭제
    @DeleteMapping("/{user-id}")
    public ResponseEntity<Void> deleteUser(@PathVariable(name = "user-id") Long userId) {
        userService.deleteUser(userId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
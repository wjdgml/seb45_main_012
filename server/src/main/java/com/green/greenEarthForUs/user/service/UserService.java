package com.green.greenEarthForUs.user.service;
import com.green.greenEarthForUs.Exception.BusinessLogicException;
import com.green.greenEarthForUs.Exception.ExceptionCode;
import com.green.greenEarthForUs.user.Entity.User;
import com.green.greenEarthForUs.user.Repository.UserRepository;
import com.green.greenEarthForUs.user.dto.UserAnswerDto;
import com.green.greenEarthForUs.user.dto.UserPatchDto;
import com.green.greenEarthForUs.user.dto.UserPostDto;
import com.green.greenEarthForUs.user.mapper.UserMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Optional;

import static com.green.greenEarthForUs.user.Entity.User.Role.USER;
import static com.green.greenEarthForUs.user.Entity.User.UserGrade.LAND;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper mapper;


    public UserService(UserRepository userRepository, UserMapper mapper) {
        this.userRepository = userRepository;
        this.mapper = mapper;
    }


    // 사용자 등록
    public User createUser(UserPostDto userPostDto, String imageUrl) {

        User user = mapper.userPostDtoToUser(userPostDto);

        // 이미지 업로드
        user.setImageUrl(imageUrl);
        user.setCreatedAt(LocalDateTime.now());
        user.setRole(USER);
        user.setGrade(LAND);

        return userRepository.save(user);
    }

    // 사용자 조회
    public User getUser(Long userId) {

        User findUser = userRepository.findById(userId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));

        updateGradePostCount(findUser);

        return findUser;

    }

    // 해당 사용자 질문 확인
    public boolean verifyAnswer(Long userId, String answer) {

        User user = getUser(userId);
        return user.getPasswordAnswer().equals(answer);
    }

    // 사용자 수정
    public User updateUser(Long userId, UserPatchDto userPatchDto) {

        User existing = getUser(userId);

        Optional.ofNullable(userPatchDto.getUserName()).ifPresent(userName -> existing.setUserName(userName));
        Optional.ofNullable(userPatchDto.getPassword()).ifPresent(password -> existing.setPassword(password));
        Optional.ofNullable(userPatchDto.getPasswordQuestion()).ifPresent(passwordQuestion -> existing.setPasswordQuestion(passwordQuestion));
        Optional.ofNullable(userPatchDto.getPasswordAnswer()).ifPresent(passwordAnswer -> existing.setPasswordAnswer(passwordAnswer));

        updateGradePostCount(existing);


        return userRepository.save(existing);
    }

    // 사용자 삭제
    public void deleteUser(Long userId) {
        User existing = getUser(userId);
        userRepository.delete(existing);
    }

    @Transactional
    public void updateGradePostCount(User user) {

        int postCount = user.getPosts().size(); // 사용자의 게시글 수 가져와서 쌓기 실제로는 사진이 들어감

        User.UserGrade newGrade = calculateUserGrade(postCount);
        user.setGrade(newGrade);

        // 등급에 따른 이미지 URL 설정 -> 상태값 던져주면 fe에서 받아서 쓰는것도 ... /
        switch (newGrade) {
            case LAND:
                user.setGradeImageFile("url_for_land_image");
                break;
            case SPROUT:
                user.setGradeImageFile("url_for_sprout_image");
                break;
            case GROWING_SPROUT:
                user.setGradeImageFile("url_for_growing_sprout_image");
                break;
            case BUD:
                user.setGradeImageFile("url_for_bud_image");
                break;
            case FLOWER:
                user.setGradeImageFile("url_for_flower_image");
                break;
            default:
                user.setGradeImageFile("default_image_url");
                break;
        }

    }

    private User.UserGrade calculateUserGrade(int postCount) {
        if (postCount == 0) {
            return LAND;
        } else if (postCount >= 1 && postCount < 5) {
            return User.UserGrade.SPROUT;
        } else if (postCount >= 5 && postCount < 10) {
            return User.UserGrade.GROWING_SPROUT;
        } else if (postCount >= 10 && postCount < 20) {
            return User.UserGrade.BUD;
        } else {
            return User.UserGrade.FLOWER;
        }

    }
}

package com.green.greenEarthForUs.post.Service;

import com.green.greenEarthForUs.Exception.ImageDeletionException;
import com.green.greenEarthForUs.Exception.UnauthorizedException;
import com.green.greenEarthForUs.Image.Service.ImageService;
import com.green.greenEarthForUs.calendar.Service.CalendarService;
import com.green.greenEarthForUs.post.DTO.PostPatchDto;
import com.green.greenEarthForUs.post.DTO.PostPostDto;
import com.green.greenEarthForUs.post.DTO.PostResponseDto;
import com.green.greenEarthForUs.post.Entity.Post;
import com.green.greenEarthForUs.post.Mapper.PostMapper;
import com.green.greenEarthForUs.post.Repository.PostRepository;
import com.green.greenEarthForUs.user.Entity.User;
import com.green.greenEarthForUs.user.Repository.UserRepository;
import com.green.greenEarthForUs.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityNotFoundException;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;



@Service
public class PostService {

    private final PostRepository postsRepository;
    private final UserRepository userRepository;
    private final PostMapper mapper;
    private final UserService userService;

    private final CalendarService calendarService;

    private final ImageService imageService;

    @Autowired
    public PostService(PostRepository postsRepository, UserRepository userRepository, PostMapper mapper,
                       UserService userService, ImageService imageService, CalendarService calendarService) {
        this.postsRepository = postsRepository;
        this.userRepository = userRepository;
        this.mapper = mapper;
        this.userService = userService;
        this.imageService = imageService;
        this.calendarService = calendarService;
    }

    // 게시글 생성
    @Transactional
    public Post createPost(Long userId, PostPostDto postPostDto, List<MultipartFile> images) throws IOException { // 유저, 게시글
        User user = userService.getUser(userId); // user검증

        Post post = mapper.postPostDtoToPost(postPostDto);
        post.setUser(user);
        post.setCreatedAt(LocalDateTime.now()); // 게시글 생성하고
        post.setOpen(postPostDto.isOpen());
        if(images!=null) {
            post.setImageUrls(imagesUpload(images));
        }
        calendarService.updateStampedDate(userId, post.getPostId(), user.getCalendar().getCalendarId());//post생성으로 calendar에 date저장
        Post savedPost = postsRepository.save(post); // 게시글 저장

        // 사용자의 등급을 게시글 수에 따라서 추가 땅 -> 새싹 ...
        userService.getUser(user.getUserId());
        return savedPost;

    }

    // 단일 게시글 조회
    @Transactional
    public PostResponseDto getPost(Long postId) {
        Post post = postsRepository.findById(postId).orElseThrow(() -> new EntityNotFoundException("Post not found" + postId));
        PostResponseDto responseDto = mapper.postToPostResponseDto(post);

        responseDto.setUserId(post.getUser().getUserId());
        return responseDto;
    }

    // 모든 게시글 조회
    @Transactional
    public List<PostResponseDto> getAllPosts() {
        List<Post> posts = postsRepository.findAll();
        return posts.stream()
                .map(mapper::postToPostResponseDto)
                .collect(Collectors.toList());
    }

    // 게시판 별 게시글 조회
    @Transactional
    public List<PostResponseDto> getPostsByType(String typeName) {
        List<Post> posts = postsRepository.findByType(typeName);
        return posts.stream()
                .map(mapper::postToPostResponseDto)
                .collect(Collectors.toList());
    }

    // 사용자 별 게시글 조회
    @Transactional
    public List<PostResponseDto> getPostsByUserId(Long userId) {
        User user = new User();
        user.setUserId(userId);
        List<Post> posts = postsRepository.findByUser(user);
        return posts.stream()
                .map(mapper::postToPostResponseDto)
                .collect(Collectors.toList());
    }
    // 게시글 수정
    @Transactional
    public PostResponseDto updatePost(Long userId, Long postId, PostPatchDto postPatchDto, List<MultipartFile> images) throws Exception{

        Post existingPost = postsRepository.findById(postId)
                .orElseThrow(() -> new EntityNotFoundException("Post not found with ID: " + postId));

        // 게시글의 작성자와 요청한 사용자가 일치하는지 확인
        User user = existingPost.getUser();
        if (!user.getUserId().equals(userId)) {
            throw new UnauthorizedException("You are not authorized to update this post.");
        }

        // 새로운 내용으로 게시글 업데이트
        Optional.ofNullable(postPatchDto.getTitle())
                        .ifPresent(existingPost::setTitle);
        Optional.ofNullable(postPatchDto.getType())
                        .ifPresent(existingPost::setType);
        Optional.ofNullable(postPatchDto.getOpen())
                        .ifPresent(existingPost::setOpen);
        Optional.ofNullable(postPatchDto.getBody())
                        .ifPresent(existingPost::setBody);
        //이미지 저장,
        existingPost.setImageUrls(imagesUpload(images));

        // 업데이트된 게시글 저장
        Post updatedPost = postsRepository.save(existingPost);

        return mapper.postToPostResponseDto(updatedPost);
    }

    // 게시글 삭제
    @Transactional
    public void deletePost(Long postId, Long userId) throws ImageDeletionException {
        Post existingPost = postsRepository.findById(postId)
                .orElseThrow(() -> new EntityNotFoundException("Post not found with ID: " + postId));

        //이미지 삭제하기
        List<String> imageUrl = existingPost.getImageUrls();
        if(!imageUrl.isEmpty()) {
            for(String image : imageUrl) {
                try {
                    imageService.deleteImage(image);
                } catch (Exception e) {
                    throw new ImageDeletionException("Failed to delete image: " + imageUrl, e);
                }
            }
        }



        // 작성자 요청자 일치하는지
        Long id = existingPost.getUser().getUserId();
        if (!Objects.equals(id, userId)) {
            throw new UnauthorizedException("You are not authorized to delete this post");
        }

        postsRepository.delete(existingPost);
    }


    private List<String> imagesUpload(List<MultipartFile> images){

            List<String> imageUrls = new ArrayList<>();
            for(MultipartFile file : images) {
                String imageUrl = imageService.uploadImage(file);
                imageUrls.add(imageUrl);
            }
            return imageUrls;

    }
}


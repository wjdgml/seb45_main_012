package com.green.greenEarthForUs.comment.Controller;

import com.green.greenEarthForUs.comment.DTO.CommentDto;
import com.green.greenEarthForUs.comment.DTO.CommentResponseDto;
import com.green.greenEarthForUs.comment.Entity.Comment;
import com.green.greenEarthForUs.comment.Mapper.CommentMapper;
import com.green.greenEarthForUs.comment.Service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/comment")
public class CommentController {
    private final CommentService commentService;

    private final CommentMapper mapper;

    @Autowired
    public CommentController(CommentService commentService, CommentMapper mapper) {
        this.commentService = commentService;
        this.mapper = mapper;
    }

    @PostMapping("/{post-id}/{user-id}")
    public ResponseEntity<CommentDto> createComment(@PathVariable(value = "post-id") Long postId,
                                                   @PathVariable(value = "user-id") Long userId,
                                                   @RequestBody CommentDto commentDto) {
        Comment createdComment = commentService.createComment(postId, userId, commentDto);
        CommentDto responseDto = mapper.commentToCommentDto(createdComment);

        return ResponseEntity.status(HttpStatus.CREATED).body(responseDto);
    }

    @GetMapping("/{post-id}/{user-id}/{comment-id}")
    public ResponseEntity<CommentResponseDto> getComment(@PathVariable(value = "post-id") Long postId,
                                                         @PathVariable(value = "user-id") Long userId,
                                                         @PathVariable(value = "comment-id") Long commentId) {
        Comment comment = commentService.getComment(postId, userId, commentId);
        CommentResponseDto response =mapper.commentToResponseDto(comment);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{post-id}/{user-id}")
    public ResponseEntity<List<CommentResponseDto>> getComments(@PathVariable(value = "post-id") Long postId,
                                                                @PathVariable(value = "user-id") Long userId) {
        List<Comment> comments = commentService.getComments(postId, userId);
        List<CommentResponseDto> responseDto = mapper.commentListToResponseDtoList(comments);

        return ResponseEntity.ok(responseDto);
    }
    @PatchMapping("/{post-id}/{user-id}/{comment-id}")
    public ResponseEntity<CommentResponseDto> updateComment(@PathVariable(value = "post-id") Long postId,
                                                            @PathVariable(value = "user-id") Long userId,
                                                            @PathVariable(value = "comment-id")Long commentId,
                                                            @RequestBody CommentDto commentDto) {
        Comment updateComment = commentService.updateComment(postId, userId, commentId, commentDto);
        CommentResponseDto responseDto = mapper.commentToResponseDto(updateComment);

        return ResponseEntity.ok(responseDto);
    }

    @DeleteMapping("/{post-id}/{user-id}/{comment-id}")
    public ResponseEntity<Void> deleteComment(@PathVariable(value = "post-id") Long postId,
                                              @PathVariable(value = "user-id") Long userId,
                                              @PathVariable(value = "comment-id")Long commentId) {
        commentService.deleteComment(postId, userId, commentId);

        return ResponseEntity.noContent().build();
    }
}

package com.green.greenEarthForUs.comment.Service;


import com.green.greenEarthForUs.Exception.BusinessLogicException;
import com.green.greenEarthForUs.Exception.ExceptionCode;
import com.green.greenEarthForUs.comment.DTO.CommentDto;
import com.green.greenEarthForUs.comment.Entity.Comment;
import com.green.greenEarthForUs.comment.Repository.CommentRepository;
import com.green.greenEarthForUs.post.Entity.Post;
import com.green.greenEarthForUs.user.Entity.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
@Service
public class CommentService {

    private final CommentRepository commentRepository;


    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    // 댓글 생성
    @Transactional
    public Comment createComment(Long postId, Long userId, CommentDto commentDto) {
        Comment comment = new Comment();

        Post post= new Post();
        post.setPostId(postId);
        comment.setPost(post);

        comment.setBody(commentDto.getBody()); // 댓글 내용 설정

        User user = new User();
        user.setUserId(userId);
        comment.setUser(user);

        return commentRepository.save(comment);
    }

    // 특정 댓글 조회
    @Transactional
    public Comment getComment(Long postId, Long userId, Long commentId) {

        Comment comment = verifyComment(commentId);
        if (!comment.getPost().getPostId().equals(postId) || !comment.getUser().getUserId().equals(userId)) {
            throw new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND);
        }
        return comment;
    }
    // 게시글 별 댓글 리스트 조회
    @Transactional
    public List<Comment> getComments(Long postId, Long userId) {
        return commentRepository.findByPost_PostIdAndUser_UserId(postId, userId);
    }

    // 댓글 수정
    @Transactional
    public Comment updateComment(Long postId, Long userId, Long commentId, CommentDto commentDto) {
        Comment comment = verifyComment(commentId); // 해당 댓글을 DB에서 조회하고 comment 변수에 저장함

        if (!comment.getPost().getPostId().equals(postId) || !comment.getUser().getUserId().equals(userId)) {
            throw new BusinessLogicException(ExceptionCode.INVALID_COMMENT_ACCESS); // 작성자가 작성한 댓글이 아니면,,
        }

        // 댓글 내용을 업데이트합니다.
        comment.setBody(commentDto.getBody());

        return commentRepository.save(comment);
    }

    // 댓글 삭제
    @Transactional
    public void deleteComment(Long postId, Long userId, Long commentId) {

        Comment comment = verifyComment(commentId); // 해당 댓글을 DB에서 조회하고 comment 변수에 저장함
        if (!comment.getPost().getPostId().equals(postId) || !comment.getUser().getUserId().equals(userId)) {
            throw new BusinessLogicException(ExceptionCode.INVALID_COMMENT_ACCESS); // 댓글이 속한 게시글의 사용자와 user를 비교해서 같지 게시글 사용자에 속하지 않으면 엑세스 권한 없음
        }

        commentRepository.deleteById(commentId);
    }

    // 댓글 조회 (단일)
    //public Comment findComment(Long commentId) {
    //return verifyComment(commentId);
    //}

    private Comment verifyComment(Long commentId) {
        Optional<Comment> commentOptional = commentRepository.findById(commentId);
        return commentOptional.orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
    }
}

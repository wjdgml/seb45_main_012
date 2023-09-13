package com.green.greenEarthForUs.vote.Controller;

import com.green.greenEarthForUs.post.Service.PostService;
import com.green.greenEarthForUs.user.Entity.User;
import com.green.greenEarthForUs.user.service.UserService;
import com.green.greenEarthForUs.vote.DTO.VoteDto;
import com.green.greenEarthForUs.vote.Entity.Vote;
import com.green.greenEarthForUs.vote.Mapper.VoteMapper;
import com.green.greenEarthForUs.vote.Service.VoteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/vote")
public class VoteController {

    private final VoteService voteService;
    private final VoteMapper mapper;
    private final UserService userService;
    private final PostService postService;

    public VoteController(VoteService voteService,
                          VoteMapper mapper,
                          PostService postService,
                          UserService userService){
        this.voteService = voteService;
        this.mapper = mapper;
        this.postService = postService;
        this.userService = userService;
    }

    @PostMapping("/{post_id}")
    public ResponseEntity postVote(@PathVariable("post_id") long postId){
        postService.getPost(postId);   //post가 유효한지 확인하는 로직
        Vote createdVote = voteService.createVote();
        VoteDto.Response vote = mapper.voteToVoteResponseDto(createdVote);
        vote.setPostId(postId);

        return new ResponseEntity(vote, HttpStatus.CREATED);
    }

    @PatchMapping("/{post_id}/{user_id}/{vote_id}")
    public ResponseEntity patchVote(@PathVariable("post_id") long postId,
                                    @PathVariable("user_id") long userId,
                                    @PathVariable("vote_id") long voteId,
                                    @Validated @RequestBody VoteDto.Patch patch){
        postService.getPost(postId);   //post가 유효한지 확인하는 로직


        //이전에 좋아요를 투표했는지 확인 후 좋아요가 중복이면 count를 하나 빼는 로직.
        long count = voteService.findVoteCount(voteId).getVoteCount();
        String type = verifiedVoteUserId(userId, voteId);
        if(type.equals("Like")) voteService.findVoteCount(voteId).setVoteCount(count-1);

        patch.addVoteId(voteId);
        Vote updateVote = voteService.updateVote(mapper.votePatchDToToVote(patch));
        VoteDto.Response response = mapper.voteToVoteResponseDto(updateVote);
        response.setPostId(postId);
        response.setUserId(userId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{post_id}/{vote_id}")
    public ResponseEntity getVote(@PathVariable("post_id") long postId,
                                  @PathVariable("vote_id") long voteId){

        postService.getPost(postId);   //post가 유효한지 확인하는 로직
        Vote findVote = voteService.findVoteCount(voteId);

        return ResponseEntity.ok(mapper.voteToVoteResponseDto(findVote));
    }

    @DeleteMapping("/{post_id}/{user_id}/{vote_id}")
    public ResponseEntity deleteVote(@PathVariable("post_id") long postId,
                                     @PathVariable("user_id") long userId,
                                     @PathVariable("vote_id") long voteId){

        postService.getPost(postId);   //post가 유효한지 확인하는 로직
        userService.getUser(userId);

        voteService.deleteVote(voteId);
        return ResponseEntity.noContent().build();
    }


//     유저가 이미 좋아요를 눌렀는지 확인하는 로직
    private String verifiedVoteUserId(long userId, long voteId){
        User user =  userService.getUser(userId);
        List<Vote> voteUserList = user.getVotes();
        String voteType = "";
        for(Vote vote : voteUserList){
            if(vote.getVoteId() == voteId){
                voteType = vote.getVoteType();
            }
        }
        return voteType;
    }

}

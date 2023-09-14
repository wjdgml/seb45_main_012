package com.green.greenEarthForUs.vote.Service;

import com.green.greenEarthForUs.Exception.BusinessLogicException;
import com.green.greenEarthForUs.Exception.ExceptionCode;
import com.green.greenEarthForUs.post.DTO.PostResponseDto;
import com.green.greenEarthForUs.post.Entity.Post;
import com.green.greenEarthForUs.post.Mapper.PostMapper;
import com.green.greenEarthForUs.post.Service.PostService;
import com.green.greenEarthForUs.vote.DTO.VoteDto;
import com.green.greenEarthForUs.vote.Entity.Vote;
import com.green.greenEarthForUs.vote.Mapper.VoteMapper;
import com.green.greenEarthForUs.vote.Repository.VoteRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class VoteService {

    private final VoteRepository voteRepository;
    private final PostService postService;
    private final PostMapper postMapper;
    private final VoteMapper mapper;

    public VoteService(VoteRepository voteRepository,
                       PostService postService,
                       PostMapper postMapper,
                       VoteMapper mapper){
        this.voteRepository = voteRepository;
        this.postService = postService;
        this.postMapper = postMapper;
        this.mapper = mapper;
    }

    public VoteDto.Response createVote(long postId){
        PostResponseDto post = postService.getPost(postId);//post가 유효한지 확인하는 로직
        Post findPost = postMapper.postResponseDtoToPost(post);
        if(!findPost.getVote().equals(null)) throw new BusinessLogicException(ExceptionCode.VOTE_EXISTS);
        Vote vote = new Vote();
        vote.setPost(postMapper.postResponseDtoToPost(post));

        return mapper.voteToVoteResponseDto(voteRepository.save(vote));
    }

    public Vote updateVote(Vote vote){
        Vote findVote = findVerifiedVote(vote.getVoteId());
        long count = findVote.getVoteCount();
        Optional.ofNullable(vote.getVoteType())
                .ifPresent(findVote::setVoteType);
        if(vote.getVoteType().equals("Like")) findVote.setVoteCount(count+1);
        // 주어진 요청에 좋아요에 변화가 있으면 voteCount를 변경하고 저장하는 로직
        return voteRepository.save(findVote);
    }

    public Vote findVoteCount(long voteId){

        return findVerifiedVote(voteId);
    }

    public void deleteVote(long voteId){
        Vote findVote = findVerifiedVote(voteId);
        voteRepository.delete(findVote);
    }

    public Vote findVerifiedVote(long voteId){
        Optional<Vote> optionalVote =
                voteRepository.findById(voteId);
        Vote findvote =
                optionalVote.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.VOTE_NOT_FOUND));
        return findvote;
    }
}

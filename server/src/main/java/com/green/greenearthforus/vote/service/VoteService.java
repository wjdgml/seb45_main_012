package com.green.greenearthforus.vote.service;

import com.green.greenearthforus.exception.BusinessLogicException;
import com.green.greenearthforus.exception.ExceptionCode;
import com.green.greenearthforus.post.entity.Post;
import com.green.greenearthforus.post.repository.PostRepository;
import com.green.greenearthforus.vote.dto.VoteDto;
import com.green.greenearthforus.vote.entity.Vote;
import com.green.greenearthforus.vote.mapper.VoteMapper;
import com.green.greenearthforus.vote.repository.VoteRepository;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;

@Service
public class VoteService {

    private final VoteRepository voteRepository;
    private final PostRepository postRepository;
    private final VoteMapper mapper;

    public VoteService(VoteRepository voteRepository,
                       PostRepository postRepository,
                       VoteMapper mapper){
        this.voteRepository = voteRepository;
        this.postRepository = postRepository;
        this.mapper = mapper;
    }

    public VoteDto.Response createVote(long postId){
        Post findPost = postRepository.findById(postId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.VOTE_NOT_FOUND));//post가 유효한지 확인하는 로직

        if(findPost.getVote() != null) throw new BusinessLogicException(ExceptionCode.VOTE_EXISTS);

        Vote vote = new Vote();
        vote.setPost(findPost);

        return mapper.voteToVoteResponseDto(voteRepository.save(vote));
    }

    public Vote updateVote(Vote vote){
        Vote findVote = findVerifiedVote(vote.getVoteId());
        long count = findVote.getVoteCount();
        Optional.ofNullable(vote.getVoteType())
                .ifPresent(findVote::setVoteType);
        if(Objects.equals(Objects.requireNonNull(vote.getVoteType()), "Like")) findVote.setVoteCount(count+1);
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
        return optionalVote.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.VOTE_NOT_FOUND));
    }
}

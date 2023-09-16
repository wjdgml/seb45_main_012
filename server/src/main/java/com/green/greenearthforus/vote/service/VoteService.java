package com.green.greenearthforus.vote.service;

import com.green.greenearthforus.exception.BusinessLogicException;
import com.green.greenearthforus.exception.ExceptionCode;
import com.green.greenearthforus.post.entity.Post;
import com.green.greenearthforus.post.repository.PostRepository;
import com.green.greenearthforus.user.entity.User;
import com.green.greenearthforus.user.repository.UserRepository;
import com.green.greenearthforus.user.service.UserService;
import com.green.greenearthforus.vote.dto.VoteDto;
import com.green.greenearthforus.vote.entity.Vote;
import com.green.greenearthforus.vote.entity.VoteUser;
import com.green.greenearthforus.vote.mapper.VoteMapper;
import com.green.greenearthforus.vote.repository.VoteRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class VoteService {

    private final VoteRepository voteRepository;
    private final PostRepository postRepository;
    private final VoteMapper mapper;
    private final UserService userService;
    private final UserRepository userRepository;

    public VoteService(VoteRepository voteRepository,
                       PostRepository postRepository,
                       VoteMapper mapper,
                       UserRepository userRepository,
                       UserService userService){
        this.voteRepository = voteRepository;
        this.postRepository = postRepository;
        this.mapper = mapper;
        this.userService = userService;
        this.userRepository = userRepository;
    }

    public VoteDto.Response createVote(long postId){
        Post findPost = postRepository.findById(postId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.VOTE_NOT_FOUND));//post가 유효한지 확인하는 로직

        if(findPost.getVote() != null) throw new BusinessLogicException(ExceptionCode.VOTE_EXISTS);

        Vote vote = new Vote();
        vote.setPost(findPost);

        return mapper.voteToVoteResponseDto(voteRepository.save(vote));
    }

    public VoteDto.Response updateVote(Vote vote, long userId){
        long count = findVoteCount(vote.getVoteId()).getVoteCount();
        VoteDto.Response response;
        User user =  userService.getUser(userId);
        Vote findVote = findVerifiedVote(vote.getVoteId());
        List<VoteUser> findVoteUser;
        if(user.getVoteUsers() != null && findVote.getVoteUsers() != null) {
            findVoteUser = user.getVoteUsers().stream()
                    .filter(voteUser -> voteUser.getVote().getVoteId() == findVote.getVoteId())
                    .collect(Collectors.toList());

            if(!(findVoteUser.isEmpty())) {
                user.getVoteUsers().removeAll(findVoteUser);
                findVote.getVoteUsers().removeAll(findVoteUser);
                userRepository.save(user);
                voteRepository.save(vote);

            findVote.setVoteCount(count-1);
            }else {
                VoteUser voteUser = new VoteUser();
                voteUser.setUser(user);
                voteUser.setVote(findVote);
                findVote.getVoteUsers().add(voteUser);
                user.getVoteUsers().add(voteUser);
                userRepository.save(user);
                Optional.ofNullable(vote.getVoteType())
                        .ifPresent(findVote::setVoteType);
                if (Objects.equals(Objects.requireNonNull(vote.getVoteType()), "Like")){
                    findVote.setVoteCount(count + 1);}
            }
            }else {
            VoteUser voteUser = new VoteUser();
            voteUser.setUser(user);
            voteUser.setVote(findVote);
            findVote.getVoteUsers().add(voteUser);
            user.getVoteUsers().add(voteUser);
            userRepository.save(user);
            Optional.ofNullable(vote.getVoteType())
                    .ifPresent(findVote::setVoteType);
            if (Objects.equals(Objects.requireNonNull(vote.getVoteType()), "Like")){
                findVote.setVoteCount(count + 1);}
        }

        response = mapper.voteToVoteResponseDto(voteRepository.save(findVote));
        return response;
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

package com.green.greenEarthForUs.vote.Mapper;

import com.green.greenEarthForUs.vote.DTO.VoteDto;
import com.green.greenEarthForUs.vote.Entity.Vote;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface VoteMapper {
    Vote votePatchDToToVote(VoteDto.Patch requestBody);
    VoteDto.Response voteToVoteResponseDto(Vote vote);

}

package com.green.greenEarthForUs.calendar.Mapper;

import com.green.greenEarthForUs.calendar.Entity.Calendar;
import com.green.greenEarthForUs.calendar.DTO.CalendarDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface CalendarMapper {

    Calendar calendarPatchDtoToCalendar(CalendarDto.Patch requestBody);
    @Mapping(source = "user.userId", target = "userId")
    @Mapping(source = "post.postId", target = "postId")
    CalendarDto.Response calendarToCalendarResponseDto(Calendar calendar);
    Calendar calendarResponseDtoToCalendar(CalendarDto.Response response);
}

package com.green.greenEarthForUs.calendar.Mapper;

import com.green.greenEarthForUs.calendar.Entity.Calendar;
import com.green.greenEarthForUs.calendar.DTO.CalendarDto;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface CalendarMapper {
    Calendar calendarPostDtoToCalendar(CalendarDto.Post requestBody);
    Calendar calendarPatchDtoToCalendar(CalendarDto.Patch requestBody);
    CalendarDto.Response calendarToCalendarResponseDto(Calendar calendar);

}

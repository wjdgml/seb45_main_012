package com.green.greenEarthForUs.calendar.Service;

import com.green.greenEarthForUs.Exception.BusinessLogicException;
import com.green.greenEarthForUs.Exception.ExceptionCode;
import com.green.greenEarthForUs.calendar.DTO.CalendarDto;
import com.green.greenEarthForUs.calendar.Mapper.CalendarMapper;
import com.green.greenEarthForUs.calendar.Repository.CalendarRepository;
import com.green.greenEarthForUs.calendar.Entity.Calendar;
import com.green.greenEarthForUs.post.Service.PostService;
import com.green.greenEarthForUs.user.Entity.User;
import com.green.greenEarthForUs.user.service.UserService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class CalendarService {

    private final CalendarRepository calendarRepository;
    private final CalendarMapper mapper;
    private final UserService userService;

    public CalendarService(CalendarRepository calendarRepository,
                           CalendarMapper mapper,
                           UserService userService
                           ) {
        this.calendarRepository = calendarRepository;
        this.mapper = mapper;
        this.userService = userService;
    }

    public CalendarDto.Response createCalendar(long userId) {

        userService.getUser(userId);

        Calendar createdCalendar = new Calendar();
        createdCalendar.setUser(userService.getUser(userId));

        return mapper.calendarToCalendarResponseDto(calendarRepository.save(createdCalendar));
    }

    public CalendarDto.Response updateCalendar(CalendarDto.Patch calendar, long userId, long calendarId) {
        userService.getUser(userId);
        Calendar findCalendar = findVerifiedCalendar(calendarId);

        Optional.ofNullable(calendar.getBody())
                .ifPresent(findCalendar::setBody);

        return mapper.calendarToCalendarResponseDto(calendarRepository.save(findCalendar));
    }

    public CalendarDto.Response findCalendar(long calendarId) {

        return mapper.calendarToCalendarResponseDto(findVerifiedCalendar(calendarId));
    }

    public void deleteCalendar(long calendarId) {
        calendarRepository.delete(findVerifiedCalendar(calendarId));
    }

    public Calendar findVerifiedCalendar(long calendarId) {
        Optional<Calendar> optionalCalendar =
                calendarRepository.findById(calendarId);
        Calendar findCalendar =
                optionalCalendar.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.CALENDAR_NOT_FOUND));
        return findCalendar;
    }

    public void updateStampedDate(long userId, long postId) {
    User user = userService.getUser(userId);
    Calendar find;
    if(user.getCalendar() != null){find = calendarRepository.findById(user.getCalendar().getCalendarId())
            .orElseThrow(() -> new BusinessLogicException(ExceptionCode.CALENDAR_NOT_FOUND));
    }
    else { find = mapper.calendarResponseDtoToCalendar(createCalendar(userId));
    }

    List<LocalDate> stampedDate = find.getStampedDates();
        stampedDate.add(LocalDate.now());
    }


}

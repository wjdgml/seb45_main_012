package com.green.greenEarthForUs.calendar.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public class CalendarDto {
    @Getter
    public static class Patch{
        private String body;
        private long calendarId;

    }
    @Getter
    @Builder
    public static class Response{
        private String body;
        private long userId;
        private long postId;
        private List<LocalDate> stampedDates;
    }


}

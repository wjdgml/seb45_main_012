package com.green.greenearthforus.calendar.entity;

import com.green.greenearthforus.post.entity.Post;
import com.green.greenearthforus.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Calendar {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long calendarId;

    @Column
    private String body;

    @Column
    private String doImage;

    @Column
    @ElementCollection
    private List<LocalDate> stampedDates;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private User user;

    @OneToMany
    private List<Post> post;


}

package com.green.greenEarthForUs.calendar.Entity;

import com.green.greenEarthForUs.post.Entity.Post;
import com.green.greenEarthForUs.user.Entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
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
    private LocalDateTime localDateTime;

    @OneToOne
    private User user;

    @OneToMany
    private List<Post> post;


}

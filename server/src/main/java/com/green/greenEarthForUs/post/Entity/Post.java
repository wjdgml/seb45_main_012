package com.green.greenEarthForUs.post.Entity;

import com.green.greenEarthForUs.calendar.Entity.Calendar;
import com.green.greenEarthForUs.user.Entity.User;
import com.green.greenEarthForUs.vote.Entity.Vote;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private Long postId;

    @Column
    private String body;

    @Column
    private Boolean open;

    @Column
    private String imageUrl;

    @Column
    private String type; // type 게시글의 유형

    @Column
    private String title;


    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToOne
    private Vote vote;

    @ManyToOne
    private Calendar calendar;
}

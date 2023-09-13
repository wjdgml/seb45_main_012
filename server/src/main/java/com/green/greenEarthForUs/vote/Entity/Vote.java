package com.green.greenEarthForUs.vote.Entity;

import com.green.greenEarthForUs.post.Entity.Post;
import com.green.greenEarthForUs.user.Entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Vote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long voteId;
    @Column
    private long voteCount;
    @Column
    private String voteType;

    @OneToOne
    private Post post;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User User;

}

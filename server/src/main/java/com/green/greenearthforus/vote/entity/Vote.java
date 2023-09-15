package com.green.greenearthforus.vote.entity;

import com.green.greenearthforus.post.entity.Post;
import com.green.greenearthforus.user.entity.User;
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
    private User user;

}

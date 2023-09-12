package com.green.greenEarthForUs.user.Entity;

import com.green.greenEarthForUs.post.Entity.Post; // javax.persistence.*(
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

import java.util.List;

import java.time.LocalDateTime;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column
    private String userName;

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private Role role = Role.USER;

    @Enumerated(EnumType.STRING) // Post 횟수에 따라서 땅(0개) → 새싹(1개) → 조금 더 자란 새싹(5개) → 꽃봉오리(10개) → 꽃(20개)
    private UserGrade grade; // 씨앗 -> 새싹 -> 점점 자라는 느낌 누적 게시글 기준 ..

    private String imageUrl; // 이미지 저장할 필드 추가하기

    @Column
    private String password;

    @Column
    private String passwordQuestion; // 비밀번호 초기화 ex. 우리 강아지 이름은?

    @Column
    private String passwordAnswer; // 비밀번호 초기화 질문에 대한 답변  ex. 꼬미

    @Column
    private LocalDateTime createAt;

    @Column
    private String profileImageFileName;

    @Column
    private byte[] profileImage;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    // 사용자를 삭제할 때 관련 게시물, 이미지도 자동적으로 삭제됨
    private List<Post> posts;

    public enum Role {
        USER("회원"), ADMIN("관리자");

        @Getter
        private final String role;

        Role(String role) {
            this.role = role;
        }
    }

    public enum UserGrade {
        LAND, // 땅 0개 게시글 기준
        SPROUT, // 새싹 1개
        GROWING_SPROUT, // 더 자란 새싹 5개
        BUD, // 꼿봉오리 10개
        FLOWER // 꽃 20개
    }
}






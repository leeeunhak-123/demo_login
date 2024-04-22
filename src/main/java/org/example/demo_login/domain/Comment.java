package org.example.demo_login.domain;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;



@Setter
@Getter
public class Comment {
    private int id;
    private int postId;
    private String memberNickname; // 변수명
    private String content;
    private LocalDateTime createdAt; // 변수명 변경
    private LocalDateTime updatedAt; // 변수명 변경
    private boolean isDeleted; // 변수명 변경

    @Override
    public String toString() {
        return "Comment{" +
                "id=" + id +
                ", postId=" + postId +
                ", memberNickname='" + memberNickname + '\'' +
                ", content='" + content + '\'' +
                ", isDeleted=" + isDeleted +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }
}

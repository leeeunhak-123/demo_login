package org.example.demo_login.domain;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;


import java.time.LocalDateTime;




public class Post {
    private int id;
    private String memberNickname;
    private String category;
    private String title;
    private String content;
    private LocalDateTime created_at;
    private int like_count;
    private boolean liked_by_user;
    private String image_url;

    public int getId() {
        return id;
    }

    public String getMemberNickname() {
        return memberNickname;
    }

    public String getCategory() {
        return category;
    }

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }

    public LocalDateTime getCreated_at() {
        return created_at;
    }

    public int getLike_count() {
        return like_count;
    }

    public boolean isLiked_by_user() {
        return liked_by_user;
    }

    public String getImage_url() {
        return image_url;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setMemberNickname(String memberNickname) {
        this.memberNickname = memberNickname;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setCreated_at(LocalDateTime created_at) {
        this.created_at = created_at;
    }

    public void setLike_count(int like_count) {
        this.like_count = like_count;
    }

    public void setLiked_by_user(boolean liked_by_user) {
        this.liked_by_user = liked_by_user;
    }

    public void setImage_url(String image_url) {
        this.image_url = image_url;
    }
}

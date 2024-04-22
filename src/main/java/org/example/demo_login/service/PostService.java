package org.example.demo_login.service;

import org.example.demo_login.Mapper.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.example.demo_login.domain.Post;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class PostService {
    @Autowired
    private final PostRepository mapper;

    public PostService(PostRepository mapper) {
        this.mapper = mapper;
    }

    // mapper에 요소인 카테고리 , 제목 , 게시글 생성 날짜, 닉네임 가져옴.
    public List<Post> select() {
        return mapper.SelectPosts();
    }

    public void writePost(String memberNickname, String category, String title, String content, String image, LocalDateTime createdAt, int likeCount) {
        try {
            // 이미지 파일을 바이트 배열로 변환 등 필요한 데이터 처리를 수행한 후 DB에 저장
            // 이미지 파일을 바이트 배열로 변환

            Post post = new Post();
            post.setMemberNickname(memberNickname);
            post.setCategory(category);
            post.setTitle(title);
            post.setContent(content);
            post.setImage_url(image); // 변환된 이미지 바이트 배열 설정
            post.setCreated_at(createdAt);
            post.setLike_count(likeCount);

            System.out.println("게시물: " + post);

            mapper.insertPost(post);
        } catch (Exception e) {
            e.printStackTrace();

        }
    }

    //최신글과 인기순대로 정렬하는 메소드
    public List<Post> selectPostsSorted(String sortBy, String order) {
        if (order == null) {
            order = "desc"; //기본값으로 내림차순 설정
        }
        List<Post> sortedPosts = mapper.selectPostsSorted(sortBy, order);
        System.out.println("selectPostsSorted(): 정렬된 게시글 목록을 불러옴 - 정렬기준: " + sortBy + ", 정렬방식: " + order);
        sortedPosts.forEach(post -> System.out.println(" - 게시글 ID: " + post.getId() + ", 제목: " + post.getTitle()));
        return sortedPosts;
    }

    //좋아요가 10개 이상되면 인기글만 나오게하는 메소드
    public List<Post> selectPopularPosts() {
        return mapper.selectPopularPosts();
    }

    // 카테고리별 검색을 위한 메소드
    public List<Post> searchPosts(String category, String term) {
            System.out.println(category);
            System.out.println(term);
            return mapper.searchPosts(category, term);
    }

    //게시글 상세정보를 불러오는 메소드
    public Post getPostDetails(int postId) {
            return mapper.getPostDetails(postId);
    }


}




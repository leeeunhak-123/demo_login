package org.example.demo_login.controller;

import org.example.demo_login.domain.Post;
import org.example.demo_login.service.FileStorageService;
import org.example.demo_login.service.PostService;
import org.example.demo_login.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin(origins = {"http://localhost:3000", "http://ec2-3-139-91-37.us-east-2.compute.amazonaws.com"})
@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;
    private final FileStorageService fileStorageService;

    @Autowired
    public PostController(PostService postService, JwtUtil jwtUtil,FileStorageService fileStorageService) {
        this.postService = postService;
        this.fileStorageService = fileStorageService;

    }
    //최신순, 좋아요 순으로 정렬하는 클라이언트로 보내는 엔드포인트
    @GetMapping
    public ResponseEntity<List<Post>> getPosts(
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) String order) {

        List<Post> posts = postService.selectPostsSorted(sortBy, order);
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

    //인기글을 보여주는 메서드(좋아요가 10개 이상이면)
    @GetMapping("/popular")
    public ResponseEntity<List<Post>> getPopularPosts(){
        List<Post> popularPosts = postService.selectPopularPosts();
        return new ResponseEntity<>(popularPosts,HttpStatus.OK);
    }

    // multipart/form-data로 설정이 되었기 때문에 이 경우에서는 @RequsetBody를 사용하여
    //요청을 처리할 수 없음.
    @PostMapping("/write")
    public ResponseEntity<String> writePost(
            @RequestParam("memberNickname") String memberNickname,
            @RequestParam("category") String category,
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam("image") MultipartFile image) {
        System.out.println(memberNickname);
        System.out.println(category);
        System.out.println(title);
        System.out.println(content);
        System.out.println(image);

        try{
            // 현재시간을 생성 시간으로 설정
            LocalDateTime createdAt = LocalDateTime.now();

            // 좋아요 수 초깃값 설정
            int likeCount = 0;

            //파일을 저장하고 저장된 파일의 URL을 가져옴
            String imageUrl = fileStorageService.storeFile(image);
            System.out.println(imageUrl);

            // 게시글 서비스를 사용하여 새로운 게시글 작성
            postService.writePost(memberNickname, category, title, content, imageUrl, createdAt, likeCount);

            return ResponseEntity.ok("게시글이 성공적으로 작성되었습니다.");
        } catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("게시글 작성 중 오류.");
        }
    }
    //검색 기능을 위한 엔드포인트
    @GetMapping("/search")
    public ResponseEntity<List<Post>> searchPosts(@RequestParam String category, @RequestParam String term) {
        List<Post> posts = postService.searchPosts(category,term);
        System.out.println(posts);
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

    @GetMapping("/{postId}")
    public ResponseEntity<Post> getPostDetails(@PathVariable int postId, @RequestParam(required = false) String nickname){
        // 사용자가 로그인한 상태가 아니면 nickname은 null
        Post post = postService.getPostDetails(postId);
        return new ResponseEntity<>(post, HttpStatus.OK);
    }

}

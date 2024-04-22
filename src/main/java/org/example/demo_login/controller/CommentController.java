package org.example.demo_login.controller;

import org.example.demo_login.domain.Comment;
import org.example.demo_login.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin(origins = {"http://localhost:3000", "http://ec2-3-139-91-37.us-east-2.compute.amazonaws.com"})
@RestController
@RequestMapping("/api/comment")
public class CommentController {

    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    //새로운 댓글을 추가하는 엔드포인트. 클라이언트로 부터 댓글정보(게시물 ID, 닉네임, 내용) 을 받아 데이터 베이스에 저장
    @PostMapping
    public ResponseEntity<?> addComment(@RequestBody Comment comment) {
        try {
            Comment newComment = commentService.addComment(comment.getPostId(), comment.getMemberNickname(), comment.getContent());
            return ResponseEntity.status(HttpStatus.CREATED).body(newComment);
        } catch (Exception e) {
            // 로그 기록, 적절한 예외 처리
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding comment: " + e.getMessage());
        }
    }


    //특정 게시물의 모든 댓글을 조회하는 엔드포인트
    @GetMapping("/posts/{postId}")
    public ResponseEntity<List<Comment>> getCommentsByPostId(@PathVariable int postId) {
        List<Comment> comments = commentService.getCommentsByPostId(postId);
        System.out.println("클라이언트로 보낼 postId:" + postId);
        System.out.println("클라이언트에 보낼 Comment:" + comments);
        return ResponseEntity.ok(comments);
    }
    //기존 댓글을 수정하는 엔드포인트. commentId는 수정하고자 하는 댓글의 고유 iD.클라이언트는 이 아이디와 함께 수정된 내용을 전송.
    @PutMapping("/{commentId}")
    public ResponseEntity<Void> updateComment(@PathVariable int commentId, @RequestBody Comment comment) {
        commentService.updateComment(commentId, comment.getMemberNickname(), comment.getContent());
        return ResponseEntity.ok().build();
    }
    //특정 댓글을 삭제하는 엔드포인트. commentId는 수정하고자 하는 댓글의 아이디
    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable int commentId, @RequestParam String memberNickname) {
        commentService.deleteComment(commentId, memberNickname);
        return ResponseEntity.ok().build();
    }

    //특정 댓글에 좋아요를 추가하는 엔드포인트 {commentId}는 좋아요를 추가하고자 하는 댓글의 ID이며, 사용자의 닉네임도 전달
    @PostMapping("/{commentId}/like")
    public ResponseEntity<Void> likeComment(@PathVariable int commentId, @RequestParam String nickname) {
        commentService.likeComment(commentId, nickname);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    //특정 댓글에 대한 좋아요를 삭제하는 엔드포인트
    @DeleteMapping("/{commentId}/like")
    public ResponseEntity<Void> unlikeComment(@PathVariable int commentId, @RequestParam String nickname) {
        commentService.unlikeComment(commentId, nickname);
        return ResponseEntity.ok().build();
    }
    //특정 댓글에 대한 좋아요의 총 개수를 조회하는 엔드포인트
    @GetMapping("/{commentId}/likes")
    public ResponseEntity<Integer> getLikeCountByCommentId(@PathVariable int commentId) {
        int likeCount = commentService.getLikeCountByCommentId(commentId);
        return ResponseEntity.ok(likeCount);
    }
}




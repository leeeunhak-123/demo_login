package org.example.demo_login.service;

import org.example.demo_login.Mapper.CommentRepository;
import org.example.demo_login.domain.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CommentService {

    @Autowired
    private final CommentRepository mapper;


    public CommentService(CommentRepository mapper) {
        this.mapper = mapper;
    }

    // 댓글 추가
    @Transactional
    public Comment addComment(int postId, String member_nickname, String content) {

        Comment comment = new Comment();
        comment.setPostId(postId);
        comment.setMemberNickname(member_nickname);
        comment.setContent(content);

        mapper.addComment(comment); //댓글을 데이터 베이스에 추가(올바름)

        return mapper.findCommentById(comment.getId());// 새로 추가된 댓글의 id를 통해 전체 정보를 다시 조회
    }
    //addComment 메서드 내에서 새로운 댓글이 추가되고 새로운 댓글 객체가 반환되기 전까지는 새로운 댓글의 postId가 올바르게 설정.
    //getCommentsByPostId 메서드에서 댓글을 조회할때 'postId'가
    //특정 댓글 가져오기
    public List<Comment> getCommentsByPostId(int postId) {
        System.out.println("게시물 아이디: " + postId);
        return mapper.selectCommentsByPostId(postId);
    }

    //댓글 수정
    public void updateComment(int commentId, String memberNickname, String content) {
        mapper.updateComment(commentId, memberNickname, content);
    }
    //댓글 삭제
    public void deleteComment(int commentId, String memberNickname) {
        mapper.deletedComment(commentId, memberNickname);
    }
    //댓글 조아요
    public void likeComment(int commentId, String nickname) {
        mapper.likeComment(commentId, nickname);
    }

    //댓글 좋아요 취소
    public void unlikeComment(int commentId, String nickname) {
        mapper.unlikeComment(commentId, nickname);
    }

    //좋아요 개수 가져오기
    public int getLikeCountByCommentId(int commentId) {
        return mapper.getLikeCountByCommentId(commentId);
    }

}

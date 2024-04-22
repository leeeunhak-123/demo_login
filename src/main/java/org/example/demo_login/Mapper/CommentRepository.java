package org.example.demo_login.Mapper;

import org.apache.ibatis.annotations.*;
import org.example.demo_login.domain.Comment;

import java.util.List;

@Mapper
public interface CommentRepository {

    // 댓글을 생성하는 쿼리(포스트 아이디, 멤버 닉네임, 내용)
    @Insert("INSERT INTO comment (post_id,member_nickname, content) VALUES (#{postId}, #{memberNickname}, #{content})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void addComment(Comment comment);

    // 특정 댓글 조회
    // 특정 게시물에 속한 모든 댓글을 조회
    @Results(id = "commentResultMap", value = {
            @Result(property = "id", column = "id"),
            @Result(property = "postId", column = "post_id"),
            @Result(property = "memberNickname", column = "member_nickname"),
            @Result(property = "content", column = "content"),
            @Result(property = "createdAt", column = "created_at"),
            @Result(property = "updatedAt", column = "updated_at")
    })
    @Select("SELECT id, post_id, member_nickname, content, created_at, updated_at FROM comment WHERE post_id = #{postId} AND is_deleted = FALSE ORDER BY created_at DESC")
    List<Comment> selectCommentsByPostId(int postId);

    //해당 댓글 정보를 다시 조회
    @Select("SELECT id, post_id, member_nickname, content, created_at, updated_at FROM comment WHERE id = #{id}")
    @Results({
            @Result(property = "id", column = "id"),
            @Result(property = "postId", column = "post_id"),
            @Result(property = "memberNickname", column = "member_nickname"),
            @Result(property = "content", column = "content"),
            @Result(property = "createdAt", column = "created_at"),
            @Result(property = "updatedAt", column = "updated_at"),
            @Result(property = "isDeleted", column = "is_deleted")  // 추가로 isDeleted의 매핑도 필요합니다.
    })
    Comment findCommentById(int id);


    // 댓글을 수정하는 쿼리
    @Update("UPDATE comment SET content = #{content}, updated_at = NOW() " +
            "WHERE id = #{commentId} AND member_nickname = #{memberNickname}")
    void updateComment(@Param("commentId") int commentId, @Param("memberNickname") String memberNickname, @Param("content") String content);

    // 댓글을 삭제하는 쿼리
    @Update("UPDATE comment SET is_deleted = TRUE " +
            "WHERE id= #{commentId} AND member_nickname = #{memberNickname}")
    void deletedComment(@Param("commentId") int commentId, @Param("memberNickname") String memberNickname);

    // 댓글에 좋아요 추가
    @Insert("INSERT INTO comment_like (comment_id, member_nickname) VALUES (#{commentId}, #{nickname})")
    void likeComment(@Param("commentId") int commentId, @Param("nickname") String nickname);

    // 댓글에 대한 좋아요 삭제
    @Delete("DELETE FROM comment_like WHERE comment_id = #{commentId} AND member_nickname = #{nickname}")
    void unlikeComment(@Param("commentId") int commentId, @Param("nickname") String nickname);

    // 댓글에 대한 좋아요 개수 가져오기
    @Select("SELECT COUNT(*) FROM comment_like WHERE comment_id = #{commentId}")
    int getLikeCountByCommentId(@Param("commentId") int commentId);
}

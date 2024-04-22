package org.example.demo_login.Mapper;

import org.apache.ibatis.annotations.*;
import org.example.demo_login.domain.Post;

import java.util.List;

@Mapper
public interface PostRepository {
    //전체 포스트 내용을 가져오는 쿼리
    @Select("SELECT p.id, p.category, p.title, p.created_at, p.like_count, m.nickname AS memberNickname " +
            "FROM post p INNER JOIN member m ON p.member_nickname = m.nickname")
    List<Post> SelectPosts();

    //포스트 작성을 위한 쿼리(닉네임, 카테고리, 제목, 내용 , 이미지, 생성날짜, 업데이트 날짜, 좋아요를 누른 유저, 이미지)
    @Insert("INSERT INTO post (member_nickname, category, title, content, created_at, like_count, liked_by_user, image_url) " +
            "VALUES (#{memberNickname}, #{category}, #{title}, #{content}, #{created_at}, #{like_count}, #{liked_by_user}, #{image_url})")
    void insertPost(Post post);
    // 정렬하기위 좋아요 순인지 , 최신순인지에 대한 정렬기준(SORT), 그리고 정렬방식(order)을 가져오는 쿼리
    @Select("<script>" +
            "SELECT p.id, p.category, p.title, p.created_at, p.like_count, m.nickname AS memberNickname " +
            "FROM post p INNER JOIN member m ON p.member_nickname = m.nickname " +
            "<if test='sortBy != null and sortBy.equals(\"createdAt\")'>" +
            "ORDER BY p.created_at " +
            "<choose>" +
            "<when test='order != null and order.equals(\"asc\")'>" +
            "ASC" +
            "</when>" +
            "<otherwise>" +
            "DESC" +
            "</otherwise>" +
            "</choose>" +
            "</if>" +
            "<if test='sortBy != null and sortBy.equals(\"likeCount\")'>" +
            "ORDER BY p.like_count " +
            "<choose>" +
            "<when test='order != null and order.equals(\"asc\")'>" +
            "ASC" +
            "</when>" +
            "<otherwise>" +
            "DESC" +
            "</otherwise>" +
            "</choose>" +
            "</if>" +
            "</script>")
    List<Post> selectPostsSorted(@Param("sortBy") String sortBy, @Param("order") String order);

    //좋아요가 10개 이상이면 인기글이라고 판단하고 인기글을 뽑아오는 쿼리
    @Select("select p.id , p.category, p.title, p.create_at,p.likecount,m.nickname AS memberNickname " +
            "from post p INNER JOIN member m ON p.member_niacname = m.nickname " +
            "WHERE p.like_count >= 10")
    List<Post> selectPopularPosts();

    //카테고리별 검색, 그리고 검색어를 입력하기위해 nickname, title, category 데이터를 뽑는 쿼리
    @Select("<script>" +
            "SELECT p.id, p.category, p.title, p.created_at, p.like_count, m.nickname AS memberNickname " +
            "FROM post p INNER JOIN member m ON p.member_nickname = m.nickname " +
            "<if test='term != null and term != \"\"'>" +
            "    <choose>" +
            "        <when test='category.equals(\"title\")'>" +
            "            AND LOWER(p.title) LIKE LOWER(CONCAT('%', #{term}, '%'))" +
            "        </when>" +
            "        <when test='category.equals(\"category\")'>" +
            "            AND LOWER(p.category) LIKE LOWER(CONCAT('%', #{term}, '%'))" +
            "        </when>" +
            "        <when test='category.equals(\"memberNickname\")'>" +
            "            AND LOWER(m.nickname) LIKE LOWER(CONCAT('%', #{term}, '%'))" +
            "        </when>" +
            "    </choose>" +
            "</if>" +
            "</script>")
    List<Post> searchPosts(@Param("category") String category, @Param("term") String term );


    //게시물의 내용을 보기위한 쿼리
    @Select("SELECT p.id,p.category,p.title,p.content,p.created_at,p.like_count,p.image_url,m.nickname AS memberNickname " +
            "FROM post p INNER JOIN member m ON p.member_nickname = m.nickname " +
            "WHERE p.id = #{postId}")
    Post getPostDetails(@Param("postId") int postId);


}


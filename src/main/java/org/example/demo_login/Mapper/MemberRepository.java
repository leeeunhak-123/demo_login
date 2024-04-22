package org.example.demo_login.Mapper;

import org.apache.ibatis.annotations.*;
import org.example.demo_login.domain.Member;

import java.util.List;

@Mapper
public interface MemberRepository {

    @Select("SELECT * FROM login.member")
    List<Member> selectAll();

    @Insert("INSERT INTO login.member(name, email, userPw, nickname, age, phone) " +
            "VALUES(#{name}, #{email}, #{userPw}, #{nickname}, #{age}, #{phone})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insert(Member member);

    @Select("SELECT * FROM login.member WHERE email = #{email} AND userPw = #{password}")
    Member login(@Param("email") String email, @Param("password") String password);

    @Select("SELECT * FROM login.member WHERE nickname = #{name}")
    Member findByUsername(@Param("name") String name);
}

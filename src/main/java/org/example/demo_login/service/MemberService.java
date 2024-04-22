package org.example.demo_login.service;

import org.example.demo_login.Mapper.MemberRepository;
import org.example.demo_login.domain.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class MemberService {
    @Autowired
    private final MemberRepository mapper;

    public MemberService(MemberRepository mapper) {
        this.mapper = mapper;
    }

    public List<Member> select(){return mapper.selectAll();}
    public void insert(Member member){ mapper.insert(member);}
    /*서비스에 로그인 메서드 추가 */
    public Member login(String email,String password) {
        return mapper.login(email,password);
    }
    public Member findByUserName(String username) {
        return mapper.findByUsername(username);
    }
}

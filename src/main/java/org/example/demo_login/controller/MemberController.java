package org.example.demo_login.controller;


import jakarta.servlet.http.HttpServletRequest;
import org.example.demo_login.domain.Member;
import org.example.demo_login.service.MemberService;
import org.example.demo_login.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@CrossOrigin(origins = {"http://localhost:3000", "http://ec2-3-139-91-37.us-east-2.compute.amazonaws.com"})
@RestController
@RequestMapping("/api/members")
public class MemberController {
    private final JwtUtil jwtUtil;
    private final MemberService memberService;

    @Autowired
    public MemberController(MemberService memberService,JwtUtil jwtUtil){
        this.memberService = memberService;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping
    public ResponseEntity<List<Member>> getSelectList() {
        List<Member> result = memberService.select();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("/insert")
    public ResponseEntity<String> insertDemoVo(@RequestBody Member member) {
        memberService.insert(member);
        return new ResponseEntity<>("Data inserted successfully", HttpStatus.OK);
    }

    /* 로그인 엔드포인트 추가 */
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String,String> loginRequset) {
        String email = loginRequset.get("email");
        String password = loginRequset.get("password");


        Member loggedInMember = memberService.login(email,password);
        if (loggedInMember != null) {
            //로그인 성공 시 JWT 생성
            String token = jwtUtil.generateToken(loggedInMember.getNickname());
            //System.out.println(token);
            //응답 데이터에 Token 추가
            Map<String, Object> responseData = new HashMap<>();
            responseData.put("nickname",loggedInMember.getNickname());
            responseData.put("member", loggedInMember);
            //토큰은 서버에서 사용자를 인증하고 사용자의 권한을 확인하는 데 사용
            responseData.put("token",token);
            //세션에 "loggedInMember" 속성 추가

            return new ResponseEntity<>(responseData, HttpStatus.OK);
        } else {
            // 로그인 실패
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
    @PostMapping("/logout")
    public ResponseEntity<Map<String,String>> logout(HttpServletRequest request) {
        //로그 아웃시에는 클라이언트에서 JWT를 삭제
        // 클라이언트에서 JWT를 삭제하는 방법은 -> 로컬 스토리지나 쿠키가 있음.
        Map<String ,String>response = new HashMap<>();
        response.put("message","로그아웃 성공!");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    //사용자 정보를 가져오는것이 때문에 get 매핑을 쓴다.
    @GetMapping("/userinfo")
    public ResponseEntity<Member> getUserInfo(@RequestHeader ("Authorization") String token) {
        //토큰이 유효한지 확인
        if (jwtUtil.validateToken((token))) {
            //유효한 경우 토큰에서 사용자의 이름을 추출해서 사용자를 인증
            String username = jwtUtil.getUsernameFromToken(token);
            //System.out.println(username); //워허더
            Member loggedInMember = memberService.findByUserName(username); //닉네임을 가지고함
            if(loggedInMember != null) {
                return new ResponseEntity<>(loggedInMember,HttpStatus.OK);
            }
        }
        //토큰이 유효하지 않거나 사용자를 찾을 수 없는 경우 UNAUTHORIZED 반환
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

}


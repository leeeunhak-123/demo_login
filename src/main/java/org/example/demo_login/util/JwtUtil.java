package org.example.demo_login.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {


    private String secretKey;

    private static final long EXPIRATION_TIME = 1000 * 60 * 60 * 24; // 1일

    private Key key;

    public JwtUtil(@Value("${myapp.secret}") String secretKey) {
        this.secretKey = secretKey;
        this.key = Keys.hmacShaKeyFor(this.secretKey.getBytes());
    }

    //토큰을 생성하는 메서드
    public String generateToken(String subject) {
        System.out.println(subject); //워허더
        System.out.println(this.key);
        Date now = new Date();
        Date expiration = new Date(now.getTime() + EXPIRATION_TIME);

        return Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(now)
                .setExpiration(expiration)
                .signWith(this.key)
                .compact();
    }

    public String getUsernameFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(this.key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jws<Claims> claims = Jwts.parserBuilder()
                    .setSigningKey(this.key)
                    .build()
                    .parseClaimsJws(token);
            return !claims.getBody().getExpiration().before(new Date());
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return false;
        }
    }

}

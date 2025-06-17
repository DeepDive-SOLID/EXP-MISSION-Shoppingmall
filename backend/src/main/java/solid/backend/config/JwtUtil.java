package solid.backend.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import solid.backend.main.sign.dto.SignMemberInfoDto;
import java.security.Key;
import java.time.ZonedDateTime;
import java.util.Date;

@Slf4j
@Component
public class JwtUtil {
    private final Key key;
    private final long accessTokenExpTime;

    public JwtUtil(
            @Value("${jwt.secret}") String secretKey,
            @Value("${jwt.expiration_time}") long accessTokenExpTime
    ) {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        this.key = Keys.hmacShaKeyFor(keyBytes);
        this.accessTokenExpTime = accessTokenExpTime;
    }

    /**
     * 설명: Access Token 생성
     * @param signMemberInfoDto
     * @return Access Token String
     */
    public String createAccessToken(SignMemberInfoDto signMemberInfoDto) {
        return createToken(signMemberInfoDto, accessTokenExpTime);
    }


    /**
     * 설명: JWT 생성
     * @param signMemberInfoDto
     * @param expireTime
     * @return JWT String
     */
    private String createToken(SignMemberInfoDto signMemberInfoDto, long expireTime) {
        Claims claims = Jwts.claims();
        claims.put("memberId", signMemberInfoDto.getMemberId());
        claims.put("authId", signMemberInfoDto.getAuthId());

        ZonedDateTime now = ZonedDateTime.now();
        ZonedDateTime tokenValidity = now.plusSeconds(expireTime);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(Date.from(now.toInstant()))
                .setExpiration(Date.from(tokenValidity.toInstant()))
                .compact();
    }

    /**
     * 설명: Token에서 MemberId 추출
     * @param accessToken
     * @return memberId
     */
    public Long getMemberId(String accessToken) {
        return parseClaims(accessToken).get("memberId", Long.class);
    }

    /**
     * 설명: JWT 검증
     * @param token
     * @return boolean
     */
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            log.error("Invalid JWT token", e);
        } catch (ExpiredJwtException e) {
            log.error("Expired JWT token", e);
        } catch (UnsupportedJwtException e) {
            log.info("Unsupported JWT token", e);
        } catch (IllegalArgumentException e) {
            log.info("JWT claims string is empty.", e);
        }
        return false;
    }

    /**
     * 설명: JWT Claims 추출
     * @param accessToken
     * @return JWT Claims
     */
    public Claims parseClaims(String accessToken) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(accessToken).getBody();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
        return null;
    }
}

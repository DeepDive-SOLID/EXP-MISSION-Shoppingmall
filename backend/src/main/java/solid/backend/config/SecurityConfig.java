package solid.backend.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import solid.backend.Jwt.JwtFilter;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {
    private final JwtFilter jwtFiler;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        // 로그인 여부 & 권한과 상관없이 사용할 수 있는 api
                        .requestMatchers("/main/sign/**", "/home/**").permitAll() // 메인 홈, 로그인 관련 페이지는 모두 접근 허용
                        .requestMatchers("/token/refresh").permitAll() // 토큰 재발급 api
                        .requestMatchers("/solid/**").permitAll() // 상품 이미지 파일 경로.

                        // 관리자 권한일 때
                        .requestMatchers("/admin/**").hasAuthority("ADMIN") // ADMIN 권한일 때 모든 ADMIN api 호출 가능
                        // 상품 관리자 권한일 때 (여행 상품 관리, 물품 관리, 주문 관리, 대시보드 api 호출 가능)
                        .requestMatchers("/admin/member/travel/**", "/admin/member/product/**",
                                         "/admin/dashboard/**", "/admin/orders/**").hasAuthority("MANAGER")

                        // 일반 사용자 권한일 때 (/admin 접근 불가능)
                        .requestMatchers("/mypage/**").hasAuthority("USER") // 마이페이지
                        .requestMatchers("/payment/**").hasAuthority("USER") // 결제, 장바구니 기능
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtFiler, UsernamePasswordAuthenticationFilter.class)
                .formLogin(form -> form.disable());

        return http.build();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
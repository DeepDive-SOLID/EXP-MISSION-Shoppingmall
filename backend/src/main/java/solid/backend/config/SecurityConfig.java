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
                        //.requestMatchers("/**").permitAll()  // 테스트를 위해 admin, main 인증 없이 허용 (테스트 완료 후 제거)
                        .requestMatchers("/main/sign/**", "/main/home/**").permitAll() //메인 홈, 로그인 관련 페이지는 모두 접근 허용
                        .requestMatchers("/admin/member/**").hasAuthority("ADMIN") //관리자 권한인 경우 admin api 호출가능
                        .requestMatchers("/admin/member/travel/**", "/admin/member/product/**").hasAuthority("MANAGER")
                        //.requestMatchers("/main/mypage/member").hasAuthority("USER") // 사용자 권한 예시
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtFiler, UsernamePasswordAuthenticationFilter.class)
                .formLogin(form -> form.disable())
                .httpBasic(httpBasic -> {});

        return http.build();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
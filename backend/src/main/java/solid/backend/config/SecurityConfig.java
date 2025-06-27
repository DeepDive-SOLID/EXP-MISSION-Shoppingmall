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
                        .requestMatchers("/**").permitAll()  // 테스트를 위해 admin, main 인증 없이 허용 (테스트 완료 후 제거)
                        // 로그인, 회원가입, ID&PW 찾기 인증 없이 허용 (추가적으로 로그인 없이 메인페이지를 사용할 수 있기 떄문에 메인 URL 추가 예정)
                        //.requestMatchers("/main/sign/**").permitAll() // admin 페이지 관리는 넣을지 말지 생각해봐야됨
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

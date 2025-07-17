package solid.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class BackendApplication implements WebMvcConfigurer {
	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
				.allowedOrigins(
						"http://3.34.125.148",															// 프론트 주소
						"http://localhost:5173")														// 로컬 개발 주소
				.allowedMethods("*")																	// GET, POST, PUT 등 모두 허용
				.allowCredentials(true);																// 쿠키나 인증 정보 포함 허용
	}
}

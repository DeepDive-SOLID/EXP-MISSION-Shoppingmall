package solid.backend.main.sign.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import solid.backend.main.sign.dto.SignInDto;
import solid.backend.main.sign.dto.SignUpCheckIdDto;
import solid.backend.main.sign.dto.SignUpDto;
import solid.backend.main.sign.service.SignService;

@Controller
@RequiredArgsConstructor
@RequestMapping("/main/sign")
public class SignController {
    private final SignService SignService;

    /**
     * 설명: 회원가입
     * @param signUpDto
     * @return ResponseEntity<String>
     */
    @PostMapping("/signUp")
    public ResponseEntity<String> signUp(@RequestBody SignUpDto signUpDto) {
        try {
            SignService.signUpDto(signUpDto);
            return ResponseEntity.ok("SUCCESS");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("FAIL");
        }
    }

    /**
     * 설명: 회원가입 아이디 중복 확인
     * @param signInCheckIdDto
     * @return ResponseEntity<Boolean> (아이디가 있으면 true, 없으면 false)
     */
    @PostMapping("/checkId")
    public ResponseEntity<Boolean> checkId(@RequestBody SignUpCheckIdDto signInCheckIdDto) {
        boolean isDuplicate = SignService.isDuplicatedId(signInCheckIdDto.getMemberId());
        return ResponseEntity.ok(isDuplicate);
    }

    /**
     * 설명: 로그인 시 토큰 발급
     * @param signInDto
     * @return ResponseEntity<String>
     */
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody SignInDto signInDto) {
        try {
            String token = SignService.login(signInDto);
            return ResponseEntity.ok(token);
        } catch (UsernameNotFoundException | BadCredentialsException e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("LOGIN_FAIL: " + e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("LOGIN_ERROR: 알 수 없는 오류가 발생했습니다.");
        }
    }
}

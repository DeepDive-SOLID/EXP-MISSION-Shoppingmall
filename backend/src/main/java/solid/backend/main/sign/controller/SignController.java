package solid.backend.main.sign.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import solid.backend.main.sign.dto.SignUpCheckIdDto;
import solid.backend.main.sign.dto.SignUpDto;
import solid.backend.main.sign.service.SignService;

@Controller
@RequiredArgsConstructor
@RequestMapping("/main")
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
}

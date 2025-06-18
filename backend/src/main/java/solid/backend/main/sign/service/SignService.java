package solid.backend.main.sign.service;

import solid.backend.main.sign.dto.SignFindIdDto;
import solid.backend.main.sign.dto.SignInDto;
import solid.backend.main.sign.dto.SignUpDto;


public interface SignService {
    /**
     * 설명: 회원가입
     * @param signUpDto
     */
    void signUpDto(SignUpDto signUpDto);

    /**
     * 설명: 회원가입 아이디 중복 확인
     * @param memberId
     * @return
     */
    Boolean isDuplicatedId(String memberId);
    String login(SignInDto signInDto);
    String findMemberId(SignFindIdDto signFindIdDto);
}

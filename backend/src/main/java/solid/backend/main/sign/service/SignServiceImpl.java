package solid.backend.main.sign.service;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import solid.backend.Jwt.JwtUtil;
import solid.backend.Jwt.AccessToken;
import solid.backend.entity.Auth;
import solid.backend.entity.Member;
import solid.backend.jpaRepository.MemberRepository;
import solid.backend.main.sign.dto.*;

import java.time.LocalDate;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SignServiceImpl implements SignService {

    private final MemberRepository signRepository;
    private final EntityManager em;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    /**
     * 설명: 회원가입
     * @param signUpDto
     */
    @Override
    public void signUpDto(SignUpDto signUpDto) {
        Member member = new Member();

        member.setMemberId(signUpDto.getMemberId());
        member.setMemberName(signUpDto.getMemberName());
        String encodedPw = passwordEncoder.encode(signUpDto.getMemberPw());
        member.setMemberPassword(encodedPw);
        member.setMemberEmail(signUpDto.getMemberEmail());
        member.setMemberPhone(signUpDto.getMemberPhone());
        member.setMemberBirth(LocalDate.parse(signUpDto.getMemberBirth()));
        Auth auth = em.getReference(Auth.class, signUpDto.getAuthId());
        member.setAuthId(auth);

        signRepository.save(member);
    }

    /**
     * 설명: 회원가입 아이디 중복 확인
     * @param memberId
     * @return Boolean (중복이면 true, 아니면 false)
     */
    @Override
    public Boolean isDuplicatedId(String memberId) {
        return signRepository.findById(memberId).isPresent();
    }

    /**
     * 설명: 로그인 시 토큰 발급
     * @param signInDto
     * @return token
     */
    @Override
    public String login(SignInDto signInDto) {
        // 1. 사용자 조회
        Optional<Member> optionalMember = signRepository.findById(signInDto.getMemberId());
        if (optionalMember.isEmpty()) {
            throw new UsernameNotFoundException("존재하지 않는 사용자입니다.");
        }

        Member member = optionalMember.get();

        // 2. 비밀번호 확인
        if (!passwordEncoder.matches(signInDto.getMemberPw(), member.getMemberPassword())) {
            throw new BadCredentialsException("비밀번호가 일치하지 않습니다.");
        }

        // 3. 토큰에 담을 최소한의 사용자 정보 구성
        AccessToken dto = AccessToken.builder()
                .memberId(member.getMemberId())
                .authId(member.getAuthId().getAuthId()) // 권한 코드 (예: "ADMIN")
                .build();

        // 4. JWT 발급
        String accessToken = jwtUtil.createAccessToken(dto);

        // refreshToken은 백엔드에서 저장 필요.
        String refreshToken = jwtUtil.createRefreshToken(dto);

        // 5. access token 반환
        return accessToken;
    }

    /**
     * 설명: 아이디 찾기
     * @param signFindIdDto
     * @return memberId
     */
    @Override
    public String findMemberId(SignFindIdDto signFindIdDto) {
        if(signFindIdDto.getMemberEmail() == null)
            throw new IllegalArgumentException("회원이 없습니다.");
        Member member = signRepository.findByMemberEmail(signFindIdDto.getMemberEmail())
                .orElseThrow(() -> new IllegalArgumentException("해당 회원이 존재하지 않습니다."));

        return member.getMemberId();
    }

    /**
     * 설명: 아이디 이메일 체크
     * @param signCheckIIdEmailDto
     */
    @Override
    public void checkIdEmail(SignCheckIIdEmailDto signCheckIIdEmailDto) {
        Member member = signRepository.findById(signCheckIIdEmailDto.getMemberId())
                .orElseThrow(() -> new IllegalArgumentException("해당 회원이 존재하지 않습니다."));

        member = signRepository.findByMemberEmail(signCheckIIdEmailDto.getMemberEmail())
                .orElseThrow(() -> new IllegalArgumentException("해당 회원이 존재하지 않습니다."));
    }

    /**
     * 설명: 비밀번호 재설정
     * @param signUpdPwDto
     */
    @Override
    public void updPw(SignUpdPwDto signUpdPwDto) {
        Member member = signRepository.findById(signUpdPwDto.getMemberId())
                .orElseThrow(() -> new IllegalArgumentException("해당 회원이 존재하지 않습니다."));

        String encodedPw = passwordEncoder.encode(signUpdPwDto.getMemberPw());
        member.setMemberPassword(encodedPw);

        signRepository.save(member);
    }
}

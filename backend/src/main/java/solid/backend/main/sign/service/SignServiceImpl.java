package solid.backend.main.sign.service;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import solid.backend.entity.Auth;
import solid.backend.entity.Member;
import solid.backend.main.sign.dto.SignUpDto;
import solid.backend.main.sign.repository.SignRepository;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class SignServiceImpl implements SignService{

    private final SignRepository signRepository;
    private final EntityManager em;
    private final BCryptPasswordEncoder passwordEncoder;

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

    public boolean isDuplicatedId(String memberId) {
        return signRepository.findById(memberId).isPresent();
    }
}

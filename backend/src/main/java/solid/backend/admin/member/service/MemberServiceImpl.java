package solid.backend.admin.member.service;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import solid.backend.admin.member.dto.MemberListDto;
import solid.backend.admin.member.dto.MemberSearchDto;
import solid.backend.admin.member.dto.MemberUpdDto;
import solid.backend.admin.member.repository.MemberQueryRepository;
import solid.backend.admin.member.repository.MemberRepository;
import solid.backend.entity.Auth;
import solid.backend.entity.Member;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final MemberQueryRepository memberQueryRepository;
    private final EntityManager em;

    /**
     * 설명: 사용자 정보 가져오기
     * @return List<MemberListDto>
     * */
    @Override
    public List<MemberListDto> getMemberList() {
        return memberRepository.findAll().stream()
                .map(member -> new MemberListDto(
                        member.getMemberId(),
                        member.getMemberName(),
                        member.getMemberEmail(),
                        member.getMemberPhone(),
                        member.getMemberBirth(),
                        member.getAuthId().getAuthName()
                )).collect(Collectors.toList());
    }

    /**
     * 설명: 사용자 정보 가져오기
     * @param memberSearchDto
     * @return List<MemberListDto>
     * */
    @Override
    public List<MemberListDto> searchMemberList(MemberSearchDto memberSearchDto) {
        return memberQueryRepository.findMember(memberSearchDto);
    }

    /**
     * 설명: 사용자 권한 변경
     * @param memberUpdDto
     */
    @Override
    public void updMemberDto(MemberUpdDto memberUpdDto) {
        Member member = memberRepository.findById(memberUpdDto.getMemberId())
                .orElseThrow(() -> new IllegalArgumentException("해당 회원이 존재하지 않습니다."));

        //memberId로 Auth 프록시 객체 조회
        Auth authProxy = em.getReference(Auth.class, memberUpdDto.getAuthId());
        member.setAuthId(authProxy);

        memberRepository.save(member);
    }
}

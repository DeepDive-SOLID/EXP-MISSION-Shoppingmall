package solid.backend.admin.member.service;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import solid.backend.admin.member.dto.MemberListDto;
import solid.backend.admin.member.dto.MemberSearchDto;
import solid.backend.admin.member.repository.MemberQueryRepository;
import solid.backend.admin.member.repository.MemberRepository;
import solid.backend.entity.Auth;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final MemberQueryRepository memberQueryRepository;

    /**
     * 설명: 여행 상품 정보 가져오기
     * @return List<MemberListDto>
     * */
    @Override
    public List<MemberListDto> getMemberList() {
        return memberRepository.findAll().stream()
                .map(member -> new MemberListDto(
                        member.getMemberId(),
                        member.getMemberName(),
                        member.getMemberPhone(),
                        member.getMemberEmail(),
                        member.getMemberBirth(),
                        member.getAuthList().stream()
                                .map(Auth::getAuthName)
                                .findFirst()
                                .orElse(null)
                )).collect(Collectors.toList());
    }

    /**
     * 설명: 여행 상품 정보 가져오기
     * @param memberSearchDto
     * @return List<MemberListDto>
     * */
    @Override
    public List<MemberListDto> searchMemberList(MemberSearchDto memberSearchDto) {
        return memberQueryRepository.findMember(memberSearchDto);
    }

}

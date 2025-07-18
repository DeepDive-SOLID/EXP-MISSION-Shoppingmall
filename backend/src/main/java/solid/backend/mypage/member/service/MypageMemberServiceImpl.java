package solid.backend.mypage.member.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import solid.backend.common.FileManager;
import solid.backend.entity.Member;
import solid.backend.jpaRepository.MemberRepository;
import solid.backend.mypage.member.dto.MypageMemberDto;
import solid.backend.mypage.member.dto.MypageMemberProfileDto;
import solid.backend.mypage.member.dto.MypageMemberUpdDto;

@Service
@RequiredArgsConstructor
public class MypageMemberServiceImpl implements MypageMemberService {

    private final MemberRepository memberRepository;
    private final FileManager fileManager;
    private final BCryptPasswordEncoder passwordEncoder;

    /**
     * 설명 : 회원 정보 조회(프로필)
     * @param memberId
     * @return MypageMemberProfileDto
     */
    @Override
    public MypageMemberProfileDto getProfileDto(String memberId) {
        return memberRepository.findById(memberId)
                .map(member -> new MypageMemberProfileDto(
                        member.getMemberId(),
                        member.getMemberName(),
                        member.getMemberImg() != null ? fileManager.getFileUrl(member.getMemberImg()) : null
                ))
                .orElseThrow(() -> new IllegalArgumentException("해당 회원이 없습니다. " + memberId));
    }

    /**
     * 설명 : 회원 정보 조회
     * @param memberId
     * @return MypageMemberDto
     */
    @Override
    public MypageMemberDto getMemberDto(String memberId) {
        return memberRepository.findById(memberId)
                .map(member -> new MypageMemberDto(
                        member.getMemberName(),
                        member.getMemberPassword(),
                        member.getMemberEmail(),
                        member.getMemberPhone(),
                        member.getMemberBirth(),
                        member.getMemberImg() != null ? fileManager.getFileUrl(member.getMemberImg()) : null
                ))
                .orElseThrow(() -> new IllegalArgumentException("해당 회원이 없습니다. " + memberId));
    }

    /**
     * 설명 : 회원 정보 수정
     * @param memberDto
     */
    @Override
    @Transactional
    public void updateMemberDto(MypageMemberUpdDto memberDto) {
        Member member = memberRepository.findById(memberDto.getMemberId())
                .orElseThrow(() -> new IllegalArgumentException("해당 회원이 없습니다. " + memberDto.getMemberId()));
        member.setMemberName(memberDto.getMemberName());
        if (memberDto.getMemberPassword() != null) {
            member.setMemberPassword(passwordEncoder.encode(memberDto.getMemberPassword()));
        }
        member.setMemberEmail(memberDto.getMemberEmail());
        member.setMemberPhone(memberDto.getMemberPhone());
        member.setMemberBirth(memberDto.getMemberBirth());
        if (memberDto.getMemberImg() != null) {
            // 기존 이미지 파일 삭제
            if (member.getMemberImg() != null) fileManager.deleteFile(member.getMemberImg());
            // 새로운 이미지 파일 저장
            String savedPath = fileManager.addFile(memberDto.getMemberImg(), "member");
            member.setMemberImg(savedPath);
        }

        memberRepository.save(member);
    }

    /**
     * 설명 : 이메일 중복 체크
     * @param memberEmail
     * @return Boolean
     */
    @Override
    public Boolean checkEmail(String memberEmail) {
        return memberRepository.findByMemberEmail(memberEmail).isPresent();
    }

    /**
     * 설명 : 회원 정보 삭제
     * @param memberId
     */
    @Override
    @Transactional
    public void deleteMemberDto(String memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("해당 회원이 없습니다. " + memberId));

        // 기존 이미지 파일 삭제
        if (member.getMemberImg() != null) {
            fileManager.deleteFile(member.getMemberImg());
        }

        memberRepository.deleteById(memberId);
    }
}

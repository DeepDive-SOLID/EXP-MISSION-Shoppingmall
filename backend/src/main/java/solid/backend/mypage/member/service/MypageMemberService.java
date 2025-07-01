package solid.backend.mypage.member.service;

import solid.backend.mypage.member.dto.MypageMemberDto;
import solid.backend.mypage.member.dto.MypageMemberProfileDto;
import solid.backend.mypage.member.dto.MypageMemberUpdDto;

public interface MypageMemberService {

    /**
     * 설명 : 회원 정보 조회(프로필)
     * @param memberId
     * @return MypageMemberProfileDto
     */
    MypageMemberProfileDto getProfileDto(String memberId);

    /**
     * 설명 : 회원 정보 조회
     * @param memberId
     * @return MypageMemberDto
     */
    MypageMemberDto getMemberDto(String memberId);

    /**
     * 설명 : 회원 정보 수정
     * @param memberDto
     */
    void updateMemberDto(MypageMemberUpdDto memberDto);

    /**
     * 설명 : 이메일 중복 체크
     * @param memberEmail
     * @return Boolean
     */
    Boolean checkEmail(String memberEmail);

    /**
     * 설명 : 회원 정보 삭제
     * @param memberId
     */
    void deleteMemberDto(String memberId);
}

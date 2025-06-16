package solid.backend.admin.member.service;

import solid.backend.admin.member.dto.MemberListDto;
import solid.backend.admin.member.dto.MemberSearchDto;

import java.util.List;
public interface MemberService {

    /**
     * 설명: 사용자 관리 정보 가져오기
     * @return List<MemberlListDto>
     * */
    List<MemberListDto> getMemberList();

    /**
     * 설명: 사용자 관리 정보 검색
     * @param
     * @return List<MemberlListDto>
     * */
    List<MemberListDto> searchMemberList(MemberSearchDto memberSearchDto);
}

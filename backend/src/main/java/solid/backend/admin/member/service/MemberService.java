package solid.backend.admin.member.service;

import solid.backend.admin.member.dto.MemberListDto;

import java.util.List;
public interface MemberService {

    /**
     * 설명: 사용자 관리 정보 가져오기
     * @return List<MemberlListDto>
     * */
    List<MemberListDto> getMemberList();
}

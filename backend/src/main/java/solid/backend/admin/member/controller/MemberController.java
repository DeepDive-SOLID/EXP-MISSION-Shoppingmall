package solid.backend.admin.member.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import solid.backend.admin.member.dto.MemberListDto;
import solid.backend.admin.member.dto.MemberSearchDto;
import solid.backend.admin.member.service.MemberService;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/admin/member")
public class MemberController {

    private final MemberService memberService;

    /**
     * 설명 : 회원 정보 가져오기
     * @return MemberDto
     */
    @ResponseBody
    @GetMapping("")
    public List<MemberListDto> getMemberList() {
        return memberService.getMemberList();
    }

    /**
     * 설명 : 회원 정보 가져오기
     * @return MemberDto
     */
    @ResponseBody
    @GetMapping("/search")
    public List<MemberListDto> searchMemberList(@RequestBody MemberSearchDto memberSearchDto) {
        return memberService.searchMemberList(memberSearchDto);
    }
}

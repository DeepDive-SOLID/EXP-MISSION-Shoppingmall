package solid.backend.admin.member.controller;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import solid.backend.admin.member.dto.MemberDto;
import solid.backend.admin.member.service.MemberService;
import java.util.List;

@Controller
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    /**
     * 설명 : 회원 정보 가져오기
     * @return MemberDto
     */
    @ResponseBody
    @GetMapping("/admin/member")
    public List<MemberDto> getMemberList() {
        return memberService.getMemberList();
    }

}

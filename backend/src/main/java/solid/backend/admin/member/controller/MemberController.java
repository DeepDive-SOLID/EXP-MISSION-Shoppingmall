package solid.backend.admin.member.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import solid.backend.admin.member.dto.MemberListDto;
import solid.backend.admin.member.dto.MemberSearchDto;
import solid.backend.admin.member.dto.MemberUpdDto;
import solid.backend.admin.member.service.MemberService;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/admin/member")
public class MemberController {

    private final MemberService memberService;

    /**
     * 설명 : 회원 정보 가져오기
     * @return List<MemberListDto>
     */
    @ResponseBody
    @GetMapping("")
    public List<MemberListDto> getMemberList() {
        return memberService.getMemberList();
    }

    /**
     * 설명 : 회원 정보 가져오기
     * @return List<MemberListDto>
     */
    @ResponseBody
    @PostMapping("/search")
    public List<MemberListDto> searchMemberList(@RequestBody MemberSearchDto memberSearchDto) {
        return memberService.searchMemberList(memberSearchDto);
    }

    /**
     * 설명: 사용자 권한 변경
     * @param memberUpdDto
     * @return ResponseEntity<String>
     */
    @ResponseBody
    @PutMapping("/updateAuth")
    public ResponseEntity<String> updMemberDto(@RequestBody MemberUpdDto memberUpdDto) {
        try {
            memberService.updMemberDto(memberUpdDto);
            return ResponseEntity.ok("SUCCESS");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("FAIL");
        }
    }
}

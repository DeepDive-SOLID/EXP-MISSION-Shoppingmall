package solid.backend.mypage.member.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import solid.backend.mypage.member.dto.MypageMemberDto;
import solid.backend.mypage.member.dto.MypageMemberProfileDto;
import solid.backend.mypage.member.dto.MypageMemberUpdDto;
import solid.backend.mypage.member.service.MypageMemberService;

@Controller
@RequiredArgsConstructor
@RequestMapping("/mypage/member")
public class MypageMemberController {

    private final MypageMemberService mypageMemberService;

    /**
     * 설명 : 회원 정보 조회(프로필)
     * @param memberId
     * @return MypageMemberProfileDto
     */
    @ResponseBody
    @PostMapping("/getProfileDto")
    public MypageMemberProfileDto getProfileDto(@RequestBody String memberId) {
        return mypageMemberService.getProfileDto(memberId);
    }

    /**
     * 설명 : 회원 정보 조회
     * @param memberId
     * @return MypageMemberDto
     */
    @ResponseBody
    @PostMapping("/getMemberDto")
    public MypageMemberDto getMemberDto(@RequestBody String memberId) {
        return mypageMemberService.getMemberDto(memberId);
    }

    /**
     * 설명 : 회원 정보 수정
     * @param memberDto
     * @return ResponseEntity<String>
     */
    @ResponseBody
    @PutMapping("/updateMemberDto")
    public ResponseEntity<String> updateMemberDto(@ModelAttribute MypageMemberUpdDto memberDto) {
        try {
            mypageMemberService.updateMemberDto(memberDto);
            return ResponseEntity.ok("SUCCESS");

        // 사용자가 잘못 입력한 경우 (ex: 파일 크기 초과 등)
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());

        // 그 외 서버 오류
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("FAIL");
        }
    }

    /**
     * 설명 : 이메일 중복 체크
     * @param memberEmail
     * @return ResponseEntity<String>
     */
    @ResponseBody
    @PostMapping("/checkEmail")
    public ResponseEntity<Boolean> checkEmail(@RequestBody String memberEmail) {
        return ResponseEntity.ok(mypageMemberService.checkEmail(memberEmail));
    }

    /**
     * 설명 : 회원 정보 삭제
     * @param memberId
     * @return ResponseEntity<String>
     */
    @ResponseBody
    @DeleteMapping("/deleteMemberDto")
    public ResponseEntity<String> deleteMemberDto(@RequestBody String memberId) {
        try {
            mypageMemberService.deleteMemberDto(memberId);
            return ResponseEntity.ok("SUCCESS");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("FAIL");
        }
    }
}

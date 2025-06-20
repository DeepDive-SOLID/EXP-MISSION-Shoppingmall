package solid.backend.mypage.member.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class MypageMemberDto {

    private String MemberName;
    private String MemberPassword;
    private String MemberEmail;
    private String MemberPhone;
    private LocalDate MemberBirth;
    private String MemberImg;
}

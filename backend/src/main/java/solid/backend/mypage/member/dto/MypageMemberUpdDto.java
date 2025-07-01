package solid.backend.mypage.member.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MypageMemberUpdDto {

    private String MemberId;
    private String MemberName;
    private String MemberPassword;
    private String MemberEmail;
    private String MemberPhone;
    private LocalDate MemberBirth;
    private MultipartFile MemberImg;
}

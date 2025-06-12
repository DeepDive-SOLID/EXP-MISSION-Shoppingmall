package solid.backend.admin.member.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class MemberListDto {
    private String memberId;
    private String memberName;
    private String memberEmail;
    private String memberPhone;
    private LocalDate memberBirth;
    private String authName;

    public MemberListDto(String memberId, String memberName, String memberEmail, String memberPhone, LocalDate memberBirth, String authName) {
        this.memberId = memberId;
        this.memberName = memberName;
        this.memberEmail = memberEmail;
        this.memberPhone = memberPhone;
        this.memberBirth = memberBirth;
        this.authName = authName;
    }
}

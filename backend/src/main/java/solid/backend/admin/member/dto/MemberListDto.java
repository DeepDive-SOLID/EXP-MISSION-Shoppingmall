package solid.backend.admin.member.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MemberListDto {
    private String memberId;
    private String memberName;
    private String memberEmail;
    private String memberPhone;
    private LocalDate memberBirth;
    private String authName;
}

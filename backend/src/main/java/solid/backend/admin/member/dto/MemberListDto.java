package solid.backend.admin.member.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
public class MemberListDto {
    private String memberId;
    private String memberName;
    private String memberEmail;
    private String memberPhone;
    private LocalDate memberBirth;
    private List<String> authList;
}

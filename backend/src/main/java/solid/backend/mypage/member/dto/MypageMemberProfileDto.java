package solid.backend.mypage.member.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MypageMemberProfileDto {

    private String memberId;
    private String memberName;
    private String memberImg;
}

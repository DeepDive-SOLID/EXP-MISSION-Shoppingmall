package solid.backend.main.sign.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignUpDto {
    private String memberId;
    private String memberName;
    private String memberPw;
    private String memberEmail;
    private String memberPhone;
    private String memberBirth;
    private String authId;
}

package solid.backend.main.sign.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SignMemberInfoDto {
    private String memberId;
    private String authId;
}

package solid.backend.admin.member.dto;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity(name = "member")
public class MemberDto {

    @Id
    private String memberId;
    private String memberName;
    private String memberEmail;
    private String memberPassword;
}

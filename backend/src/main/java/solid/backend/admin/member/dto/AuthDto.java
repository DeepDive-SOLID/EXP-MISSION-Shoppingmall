package solid.backend.admin.member.dto;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity(name = "auth")
public class AuthDto {

    @Id
    private String authId;
    private String authName;
}

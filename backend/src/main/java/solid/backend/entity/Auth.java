package solid.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.Comment;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "auth")
@Data
public class Auth {

    @Id
    @Column(name = "auth_id")
    @Comment("권한 코드")
    private String authId;

    @Column(name = "auth_name", nullable = false, length = 20)
    @Comment("권한 이름")
    private String authName;

    @OneToMany(mappedBy = "authId")
    @JsonIgnore
    private List<Member> memberList = new ArrayList<>();
}

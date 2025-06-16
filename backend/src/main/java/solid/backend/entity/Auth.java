package solid.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.Comment;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", unique = true, nullable = false)
    @Comment("회원 ID")
    private Member member;

}

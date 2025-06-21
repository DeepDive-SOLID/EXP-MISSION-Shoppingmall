package solid.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.Comment;

@Data
@Entity
@Table(name = "payment")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "payment_id")
    @Comment("결제수단 고유 ID")
    private Integer paymentId;

    @Column(name = "payment_name", nullable = false)
    @Comment("카드사 이름")
    private String paymentName;

    @Column(name = "payment_num", nullable = false)
    @Comment("카드 번호")
    private Long paymentNum;

    @Column(name = "payment_end_dt", nullable = false)
    @Comment("카드 만료일")
    private String paymentEndDt;

    @Column(name = "payment_owner", nullable = false)
    @Comment("카드 소유자명")
    private String paymentOwner;

    @Column(name = "payment_security", nullable = false)
    @Comment("카드 보안코드")
    private Integer paymentSecurity;

    @Column(name = "payment_pw", nullable = false)
    @Comment("카드 비밀번호")
    private Integer paymentPw;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    @Comment("회원 ID")
    private Member member;

}
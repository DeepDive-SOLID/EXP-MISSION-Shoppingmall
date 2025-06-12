package solid.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.Comment;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "member")
public class Member {

    @Id
    @Column(name = "member_id", length = 20)
    @Comment("회원 ID")
    private String memberId;

    @Column(name = "member_name", nullable = false, length = 10)
    @Comment("회원명")
    private String memberName;

    @Column(name = "member_pw", nullable = false, length = 30)
    @Comment("회원 비밀번호")
    private String memberPassword;

    @Column(name = "member_email", nullable = false, length = 30)
    @Comment("회원 이메일")
    private String memberEmail;

    @Column(name = "member_phone", length = 15)
    @Comment("회원 전화번호")
    private String memberPhone;

    @Column(name = "member_birth")
    @Comment("회원 생년월일")
    private LocalDate memberBirth;


    /**
     *  양방향 관련 코드 * 현재 다대일 단방향으로 설정해놓음
     */

    @OneToMany(mappedBy = "member")
    @JsonIgnore
    private List<Auth> authList = new ArrayList<>();
//
//    @OneToMany(mappedBy = "member")
//    @JsonIgnore
//    private List<Payment> paymentList = new ArrayList<>();
//
//    @OneToMany(mappedBy = "member")
//    @JsonIgnore
//    private List<OrderTravel> orderTravelList = new ArrayList<>();
//
//    @OneToMany(mappedBy = "member")
//    @JsonIgnore
//    private List<OrderProduct> orderProductList = new ArrayList<>();
}

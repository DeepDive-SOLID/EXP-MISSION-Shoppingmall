package solid.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Comment;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Table(name = "orders")
public class Orders {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    @Comment("주문 번호")
    private Integer ordersId;

    @Column(name = "order_dt", nullable = false)
    @Comment("주문 일자")
    private LocalDate orderDt;

    @Column(name = "order_state", nullable = false)
    @Comment("0: 주문완료 1: 주문취소 2: 배송중 3: 배송완료")
    @ColumnDefault("0")
    private Integer orderState;

    @Column(name = "order_addr", nullable = false)
    @Comment("주소")
    private String orderAddr;

    @Column(name = "order_addr_detail", nullable = false)
    @Comment("상세 주소")
    private String orderAddrDetail;

    @ManyToOne
    @JoinColumn(name = "payment_id", nullable = false)
    @Comment("결제수단 고유 ID")
    private Payment payment;

    @ManyToOne
    @JoinColumn(name = "member_id", nullable = false)
    @Comment("회원 ID")
    private Member member;

    @OneToMany(mappedBy = "order")
    @JsonIgnore
    private List<OrderTravel> orderTravels = new ArrayList<>();

    @OneToMany(mappedBy = "order")
    @JsonIgnore
    private List<OrderProduct> orderProducts = new ArrayList<>();
}

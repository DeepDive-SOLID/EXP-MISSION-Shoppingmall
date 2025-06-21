package solid.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.Comment;

@Data
@Entity
@Table(name = "order_travel")
public class OrderTravel {

    @EmbeddedId
    private CompoundKey id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false, insertable = false, updatable = false)
    @Comment("주문 번호")
    private Orders order;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "payment_id", nullable = false, insertable = false, updatable = false)
    @Comment("결제수단 고유 ID")
    private Payment payment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false, insertable = false, updatable = false)
    @Comment("회원 ID")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "travel_id",nullable = false, insertable = false, updatable = false)
    @Comment("상품 코드")
    private Travel travel;

    @Column(name = "order_travel_amount", nullable = false)
    @Comment("여행 상품 주문 수량")
    private Integer orderTravelAmount;
}

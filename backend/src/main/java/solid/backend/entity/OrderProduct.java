package solid.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.Comment;

@Data
@Entity
@Table(name = "order_product")
public class OrderProduct {

    @EmbeddedId
    private CompoundKey id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false, updatable = false, insertable = false)
    @Comment("주문 번호")
    private Orders order;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "payment_id", nullable = false, updatable = false, insertable = false)
    @Comment("결제수단 고유 ID")
    private Payment payment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false, insertable = false, updatable = false)
    @Comment("회원 ID")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id",nullable = false, insertable = false, updatable = false)
    @Comment("물품 코드")
    private Product product;

    @Column(name = "order_product_amount", nullable = false)
    private Integer orderProductAmount;
}


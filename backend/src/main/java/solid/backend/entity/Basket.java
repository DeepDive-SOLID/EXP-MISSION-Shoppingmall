package solid.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.Comment;

@Data
@Entity
@Table(name = "basket")
public class Basket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "basket_id")
    @Comment("장바구니 코드")
    private Integer basketId;

    @ManyToOne
    @JoinColumn(name = "member_id", nullable = false)
    @Comment("회원 ID")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "travel_id", nullable = false)
    @Comment("상품 코드")
    private Travel travel;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    @Comment("물품 코드")
    private Product product;

    @Column(name = "basket_travel_amount", nullable = false)
    @Comment("여행 상품 주문 수량(인원 수)")
    private Integer basketTravelAmount;

    @Column(name = "basket_product_amount")
    @Comment("물품 주문 수량")
    private Integer basketProductAmount;


}

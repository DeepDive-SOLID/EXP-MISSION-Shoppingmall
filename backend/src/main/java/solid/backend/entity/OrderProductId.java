package solid.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class OrderProductId implements Serializable {
    @Column(name = "order_id")
    private Integer orderId;

    @Column(name = "payment_id")
    private Integer paymentId;

    @Column(name = "member_id")
    private String memberId;

    @Column(name = "product_id")
    private Integer productId;
}
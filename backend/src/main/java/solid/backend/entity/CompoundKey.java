package solid.backend.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;

@Embeddable
public class CompoundKey implements Serializable {

    @Column(name = "order_id", nullable = false)
    private Integer orderId;

    @Column(name = "payment_id", nullable = false)
    private Integer paymentId;

    @Column(name = "member_id", nullable = false)
    private String memberId;
}

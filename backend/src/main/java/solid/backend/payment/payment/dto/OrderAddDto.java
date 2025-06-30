package solid.backend.payment.payment.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderAddDto {
    private String orderAddr;
    private String orderAddrDetail;
    private Integer orderTravelAmount;
    private Integer orderProductAmount;
    private Integer travelId;
    private Integer productId;
    private Integer paymentId;
    private String memberId;
}

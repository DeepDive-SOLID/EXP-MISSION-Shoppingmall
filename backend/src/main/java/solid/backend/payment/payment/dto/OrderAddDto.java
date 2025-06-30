package solid.backend.payment.payment.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderAddDto {
    private String orderAddr;
    private String orderAddrDetail;
    private Integer orderTravelAmount;
    private Integer travelId;
    private Integer paymentId;
    private String memberId;
    private List<OrderProductDto> products;
}

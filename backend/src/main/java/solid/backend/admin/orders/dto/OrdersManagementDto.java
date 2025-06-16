package solid.backend.admin.orders.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrdersManagementDto {

    private Integer orderId;
    private String travelName;
    private String productName;
    private String memberId;
    private String paymentName;
    private Integer orderTravelAmount;
    private Integer orderProductAmount;
    private LocalDate orderDt;
    private Integer orderState;
}

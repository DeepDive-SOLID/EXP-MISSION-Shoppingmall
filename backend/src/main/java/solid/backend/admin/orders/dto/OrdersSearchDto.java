package solid.backend.admin.orders.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class OrdersSearchDto {

    private Integer orderId;
    private String productName;
    private String memberId;
    private String paymentName;
    private LocalDate orderDt;
    private Integer orderState;
}

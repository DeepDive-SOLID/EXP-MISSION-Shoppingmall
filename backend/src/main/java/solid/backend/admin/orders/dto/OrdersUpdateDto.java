package solid.backend.admin.orders.dto;

import lombok.Data;

@Data
public class OrdersUpdateDto {
    private Integer orderId;
    private Integer orderState;
}

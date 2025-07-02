package solid.backend.payment.payment.dto;

import lombok.Data;

@Data
public class OrderProductDto {
    private Integer productId;
    private Integer orderProductAmount;
}

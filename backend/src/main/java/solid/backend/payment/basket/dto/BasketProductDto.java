package solid.backend.payment.basket.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BasketProductDto {
    private Integer productId;
    private String productName;
    private Integer productPrice;
    private Integer basketProductAmount;

}

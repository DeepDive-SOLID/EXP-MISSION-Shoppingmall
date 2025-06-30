package solid.backend.payment.basket.dto;

import lombok.Data;

@Data
public class BasketAddDto {
    private String memberId;
    private Integer travelId;
    private Integer productId;
    private Integer basketTravelAmount;
    private Integer basketProductAmount;
}

package solid.backend.payment.basket.dto;

import lombok.Data;

import java.util.List;

@Data
public class BasketAddDto {
    private String memberId;
    private Integer travelId;
    private Integer basketTravelAmount;
    private List<BasketProductDto> products;
}

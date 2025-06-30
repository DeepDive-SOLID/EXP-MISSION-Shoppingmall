package solid.backend.payment.basket.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BasketListDto {
    private Integer basketId;
    private Integer travelId;
    private String travelName;
    private Integer travelPrice;
    private LocalDate travelStartDt;
    private LocalDate travelEndDt;
    private String travelImg;
    private Integer basketTravelAmount;
    private List<BasketProductDto> basketProducts;
}

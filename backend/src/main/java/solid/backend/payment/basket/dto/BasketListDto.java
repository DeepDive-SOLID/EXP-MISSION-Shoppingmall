package solid.backend.payment.basket.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BasketListDto {
    private Integer basketId;
    private String travelName;
    private Integer travelPrice;
    private LocalDate travelStartDt;
    private LocalDate travelEndDt;
    private String travelImg;
    private String productName;
    private Integer productPrice;
    private Integer basketTravelAmount;
    private Integer basketProductAmount;
}

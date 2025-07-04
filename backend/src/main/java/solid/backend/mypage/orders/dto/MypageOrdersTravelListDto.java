package solid.backend.mypage.orders.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MypageOrdersTravelListDto {

    private Integer orderId;
    private LocalDate orderDt;
    private Integer orderStatus;
    private Integer orderTravelId;
    private String orderTravelName;
    private Integer orderTravelAmount;
    private Integer travelPrice;
    private String travelLabel;
    private Boolean travelSold;
    private Integer travelAmount;
    private LocalDate travelStartDt;
    private LocalDate travelEndDt;
    private String travelImg;
    private Long totalPrice;
    private Boolean reviewCheck;
}

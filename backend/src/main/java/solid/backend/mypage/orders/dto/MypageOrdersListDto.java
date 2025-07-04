package solid.backend.mypage.orders.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import solid.backend.entity.Product;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MypageOrdersListDto {

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
    private List<MypageOrdersProductListDto> orderProducts;
}

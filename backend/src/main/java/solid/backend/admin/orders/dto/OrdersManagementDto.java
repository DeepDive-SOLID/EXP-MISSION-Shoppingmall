package solid.backend.admin.orders.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Data;

import java.time.LocalDate;

@Data
public class OrdersManagementDto {

    private Integer orderId;
    private String travelName;
    private String productName;
    private String memberId;
    private String paymentName;
    private Integer orderTravelAmount;
    private Integer orderProductAmount;
    private LocalDate orderDt;
    private Integer orderState;

    @QueryProjection
    public OrdersManagementDto(Integer orderId, String travelName , String productName, String memberId, String paymentName, Integer orderTravelAmount, Integer orderProductAmount, LocalDate orderDt, Integer orderState) {
        this.orderId = orderId;
        this.travelName = travelName;
        this.productName = productName;
        this.memberId = memberId;
        this.paymentName = paymentName;
        this.orderTravelAmount = orderTravelAmount;
        this.orderProductAmount = orderProductAmount;
        this.orderDt = orderDt;
        this.orderState = orderState;
    }
}

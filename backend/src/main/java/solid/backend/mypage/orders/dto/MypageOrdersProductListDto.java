package solid.backend.mypage.orders.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MypageOrdersProductListDto {

    private String productName;
    private Integer orderProductAmount;
}

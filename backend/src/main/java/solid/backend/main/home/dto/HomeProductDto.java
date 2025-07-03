package solid.backend.main.home.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HomeProductDto {
    private Integer productId;
    private String productName;
    private Integer productPrice;
    private String productImg;
    private Integer productAmount;
    private Boolean productSold;
}

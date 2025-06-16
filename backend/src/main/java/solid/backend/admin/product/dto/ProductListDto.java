package solid.backend.admin.product.dto;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProductListDto {

    private Integer productId;
    private String productName;
    private Integer productPrice;
    private Integer productAmount;
    private Boolean productSold;
}



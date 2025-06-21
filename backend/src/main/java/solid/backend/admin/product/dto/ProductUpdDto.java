package solid.backend.admin.product.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductUpdDto {

    private Integer productId;
    private String productName;
    private Integer productPrice;
    private Integer productAmount;
    private Boolean productSold;
    private LocalDate productUpdateDt;
}

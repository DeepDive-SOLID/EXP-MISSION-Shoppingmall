package solid.backend.mypage.payment.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentListDto {

    private Integer paymentId;
    private String paymentName;
    private String paymentNum;
    private String paymentEndDt;
    private String paymentImg;
}

package solid.backend.payment.payment.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentCardDto {
    private Integer paymentId;
    private String paymentName;
    private String paymentNum;
    private String paymentEndDt;
    private String paymentOwner;
    private String paymentCardImg;
}


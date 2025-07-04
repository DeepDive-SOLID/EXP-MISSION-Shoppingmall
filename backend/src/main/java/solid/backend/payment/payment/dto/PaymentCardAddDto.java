package solid.backend.payment.payment.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentCardAddDto {
    private String memberId;
    private String paymentName;
    private String paymentNum;
    private String paymentEndDt;
    private String paymentOwner;
    private String paymentSecurity;
    private String paymentPw;
}

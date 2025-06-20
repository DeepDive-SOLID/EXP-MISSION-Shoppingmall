package solid.backend.mypage.payment.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentAddDto {

    private String memberId;
    private String paymentName;
    private String paymentNum;
    private String paymentEndDt;
    private String paymentOwner;
    private String paymentSecurity;
    private String paymentPw;
}

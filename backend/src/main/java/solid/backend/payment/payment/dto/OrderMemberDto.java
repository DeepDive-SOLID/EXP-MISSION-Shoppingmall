package solid.backend.payment.payment.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderMemberDto {
    private String memberName;
    private LocalDate memberBirth;
    private String memberPhone;
    private String memberEmail;
}

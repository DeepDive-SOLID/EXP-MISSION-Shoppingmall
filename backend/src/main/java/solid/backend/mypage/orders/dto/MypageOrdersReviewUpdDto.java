package solid.backend.mypage.orders.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MypageOrdersReviewUpdDto {

    private Integer reviewCode;
    private Integer reviewRate;
    private String reviewComment;
}

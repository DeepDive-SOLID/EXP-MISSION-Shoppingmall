package solid.backend.mypage.orders.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MypageOrdersReviewDto {

    private Integer travelId;
    private String memberId;
    private Integer reviewRate;
    private String reviewComment;
}

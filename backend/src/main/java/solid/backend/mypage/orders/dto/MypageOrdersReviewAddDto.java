package solid.backend.mypage.orders.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MypageOrdersReviewAddDto {

    private Integer travelId;
    private String memberId;
    private Integer reviewRate;
    private String reviewComment;
}

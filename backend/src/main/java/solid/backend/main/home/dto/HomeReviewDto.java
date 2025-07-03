package solid.backend.main.home.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HomeReviewDto {
    private Integer reviewRate;
    private String reviewComment;
    private String memberName;
}

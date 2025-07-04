package solid.backend.main.home.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HomeTravelDto {
    private Integer travelId;
    private String travelName;
    private LocalDate travelStartDt;
    private LocalDate travelEndDt;
    private String travelLabel;
    private Integer travelPrice;
    private String travelImg;
    private Double rate;
    private Integer reviewCount;
    private Integer reservedCount;
    private Integer travelAmount;
    private Boolean travelSold;
}

package solid.backend.admin.travel.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class TravelUpdDto {
    private Integer travelId;
    private String travelName;
    private Integer travelPrice;
    private Integer travelAmount;
    private Boolean travelSold;
    private String travelComment;
    private String travelLabel;
    private LocalDate travelStartDt;
    private LocalDate travelEndDt;
    private LocalDate travelUpdateDt;
    private String travelImg;
}

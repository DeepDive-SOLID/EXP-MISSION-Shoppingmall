package solid.backend.admin.travel.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class UpdateTravelDto {
    private Integer travelId;
    private String travelName;
    private Integer travelPrice;
    private Integer travelAmount;
    private boolean travelSold;
    private String travelComment;
    private String travelLabel;
    private LocalDate travelStartDt;
    private LocalDate travelEndDt;
    private LocalDate travelUploadDt;
    private LocalDate travelUpdateDt;
    private String travelImg;
}

package solid.backend.admin.travel.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TravelListDto {
    private Integer travelId;
    private String travelName;
    private Integer travelPrice;
    private Integer travelAmount;
    private Boolean travelSold;
}
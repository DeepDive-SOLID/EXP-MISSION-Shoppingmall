package solid.backend.admin.travel.dto;

import lombok.Getter;

@Getter
public class TravelSummaryDto {
    private final Integer travelId;
    private final String travelName;
    private final Integer travelPrice;
    private final Integer travelAmount;

    public TravelSummaryDto(Integer travelId, String travelName, Integer travelPrice, Integer travelAmount ) {
        this.travelId = travelId;
        this.travelName = travelName;
        this.travelPrice = travelPrice;
        this.travelAmount = travelAmount;
    }

}

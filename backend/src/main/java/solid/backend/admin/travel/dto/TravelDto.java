package solid.backend.admin.travel.dto;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity(name = "travel")
public class TravelDto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
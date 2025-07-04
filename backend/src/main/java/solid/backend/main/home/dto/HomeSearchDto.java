package solid.backend.main.home.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HomeSearchDto {
    private String name;
    private LocalDate travelStartDt;
    private LocalDate travelEndDt;
    private Integer travelAmount;
    private Integer sorted;
}
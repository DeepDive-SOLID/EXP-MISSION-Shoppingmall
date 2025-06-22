package solid.backend.admin.dashboard.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DashboardProductStatsDto {

    private Long totalTravelProducts;
    private Long soldOutTravelProducts;
}

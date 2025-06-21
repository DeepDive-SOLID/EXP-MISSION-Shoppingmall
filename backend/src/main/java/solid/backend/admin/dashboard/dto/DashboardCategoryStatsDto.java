package solid.backend.admin.dashboard.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DashboardCategoryStatsDto {

    private String categoryName;
    private Long totalAmount;
}

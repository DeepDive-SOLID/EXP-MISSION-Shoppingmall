package solid.backend.admin.dashboard.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class DashboardWeeklySalesAmtDto {

    private LocalDate date;
    private Long amount;
}

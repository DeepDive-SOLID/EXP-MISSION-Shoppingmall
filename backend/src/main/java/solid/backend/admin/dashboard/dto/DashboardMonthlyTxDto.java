package solid.backend.admin.dashboard.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
public class DashboardMonthlyTxDto {
    private Long totalTx;
    private Long cancelTx;
    private Long completeTx;
    private Long totalAmt;
}

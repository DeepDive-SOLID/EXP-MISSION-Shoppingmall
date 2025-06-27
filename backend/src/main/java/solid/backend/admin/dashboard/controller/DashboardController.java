package solid.backend.admin.dashboard.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import solid.backend.admin.dashboard.dto.DashboardCategoryStatsDto;
import solid.backend.admin.dashboard.dto.DashboardMonthlyTxDto;
import solid.backend.admin.dashboard.dto.DashboardProductStatsDto;
import solid.backend.admin.dashboard.dto.DashboardWeeklySalesAmtDto;
import solid.backend.admin.dashboard.service.DashboardService;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/admin/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    /**
     * 설명 : 이번달 거래 현황
     * @return DashboardMonthlyTxDto
     */
    @ResponseBody
    @GetMapping("/getDashboardMonthlyTxDto")
    public DashboardMonthlyTxDto getDashboardMonthlyTxDto() {
        return dashboardService.getDashboardMonthlyTxDto();
    }

    /**
     * 설명 : 현재 상품 현황
     * @return DashboardProductStatsDto
     */
    @ResponseBody
    @GetMapping("/getDashboardProductStatsDto")
    public DashboardProductStatsDto getDashboardProductStatsDto() {
        return dashboardService.getDashboardProductStatsDto();
    }

    /**
     * 설명 : 거래 카테고리 통계(물품)
     * @return DashboardCategoryStatsDto
     */
    @ResponseBody
    @GetMapping("/getDashboardCategoryStatsDto")
    public List<DashboardCategoryStatsDto> getDashboardCategoryStatsDto() {
        return dashboardService.getDashboardCategoryStatsDto();
    }

    /**
     * 설명 : 이번 주 거래 금액 통계
     * @return List<DashboardWeeklySalesAmtDto>
     */
    @ResponseBody
    @GetMapping("/getDashboardWeeklySalesAmtDto")
    public List<DashboardWeeklySalesAmtDto> getDashboardWeeklySalesAmtDto() {
        return dashboardService.getDashboardWeeklySalesAmtDto();
    }
}

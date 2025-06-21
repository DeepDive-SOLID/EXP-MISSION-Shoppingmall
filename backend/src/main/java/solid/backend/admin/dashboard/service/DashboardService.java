package solid.backend.admin.dashboard.service;

import solid.backend.admin.dashboard.dto.DashboardCategoryStatsDto;
import solid.backend.admin.dashboard.dto.DashboardMonthlyTxDto;
import solid.backend.admin.dashboard.dto.DashboardProductStatsDto;
import solid.backend.admin.dashboard.dto.DashboardWeeklySalesAmtDto;

import java.util.List;

public interface DashboardService {

    /**
     * 설명 : 이번달 거래 현황
     * @return DashboardMonthlyTxDto
     */
    DashboardMonthlyTxDto getDashboardMonthlyTxDto();

    /**
     * 설명 : 현재 상품 현황
     * @return DashboardProductStatsDto
     */
    DashboardProductStatsDto getDashboardProductStatsDto();

    /**
     * 설명 : 거래 카테고리 통계(물품)
     * @return List<DashboardCategoryStatsDto>
     */
    List<DashboardCategoryStatsDto> getDashboardCategoryStatsDto();

    /**
     * 설명 : 이번 주 거래 금액 통계
     * @return List<DashboardWeeklySalesAmtDto>
     */
    List<DashboardWeeklySalesAmtDto> getDashboardWeeklySalesAmtDto();
}

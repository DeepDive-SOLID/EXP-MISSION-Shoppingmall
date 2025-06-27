package solid.backend.admin.dashboard.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import solid.backend.admin.dashboard.dto.DashboardCategoryStatsDto;
import solid.backend.admin.dashboard.dto.DashboardMonthlyTxDto;
import solid.backend.admin.dashboard.dto.DashboardProductStatsDto;
import solid.backend.admin.dashboard.dto.DashboardWeeklySalesAmtDto;
import solid.backend.admin.dashboard.repository.DashboardQueryRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final DashboardQueryRepository dashboardQueryRepository;

    /**
     * 설명 : 이번달 거래 현황
     * @return DashboardMonthlyTxDto
     */
    @Override
    public DashboardMonthlyTxDto getDashboardMonthlyTxDto() {
        return dashboardQueryRepository.getDashboardMonthlyTxDto();
    }

    /**
     * 설명 : 이번달 거래 현황
     * @return DashboardMonthlyTxDto
     */
    @Override
    public DashboardProductStatsDto getDashboardProductStatsDto() {
        return dashboardQueryRepository.getDashboardProductStatsDto();
    }

    /**
     * 설명 : 거래 카테고리 통계(물품)
     * @return List<DashboardCategoryStatsDto>
     */
    @Override
    public List<DashboardCategoryStatsDto> getDashboardCategoryStatsDto() {
        return dashboardQueryRepository.getDashboardCategoryStatsDto();
    }

    /**
     * 설명 : 이번 주 거래 금액 통계
     * @return List<DashboardWeeklySalesAmtDto>
     */
    @Override
    public List<DashboardWeeklySalesAmtDto> getDashboardWeeklySalesAmtDto() {
        return dashboardQueryRepository.getDashboardWeeklySalesAmtDto();
    }
}

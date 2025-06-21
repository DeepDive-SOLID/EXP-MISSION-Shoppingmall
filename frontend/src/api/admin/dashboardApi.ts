// api/management/dashboardApi.ts
import api from "../axios";
import {
  DashboardCategoryStatsDto,
  DashboardProductStatsDto,
  DashboardMonthlyTxDto,
  DashboardWeeklySalesAmtDto,
} from "../../types/admin/dashboard";

export const dashboardApi = {
  // 카테고리 통계 API
  getCategoryStats: async (): Promise<DashboardCategoryStatsDto[]> => {
    const res = await api.get<DashboardCategoryStatsDto[]>(
      "/admin/dashboard/getDashboardCategoryStatsDto",
    );
    return res.data;
  },

  // 상품 통계 API
  getProductStats: async (): Promise<DashboardProductStatsDto> => {
    const res = await api.get("/admin/dashboard/getDashboardProductStatsDto");
    return res.data;
  },

  //   이번달 거래현황 API
  getMonthlyTxStats: async (): Promise<DashboardMonthlyTxDto> => {
    const res = await api.get("/admin/dashboard/getDashboardMonthlyTxDto");
    return res.data;
  },

  // 주간 매출 통계 API
  getWeeklySalesStats: async (): Promise<DashboardWeeklySalesAmtDto[]> => {
    const res = await api.get("/admin/dashboard/getDashboardWeeklySalesAmtDto");
    return res.data;
  },
};

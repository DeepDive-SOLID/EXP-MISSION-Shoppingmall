export type DashboardCategoryStatsDto = {
  categoryName: string;
  totalAmount: number;
};

export type DashboardProductStatsDto = {
  totalTravelProducts: number;
  soldOutTravelProducts: number;
};

export type DashboardMonthlyTxDto = {
  totalTx: number;
  cancelTx: number;
  completeTx: number;
  totalAmt: number;
};

export type DashboardWeeklySalesAmtDto = {
  date: string;
  amount: number;
};

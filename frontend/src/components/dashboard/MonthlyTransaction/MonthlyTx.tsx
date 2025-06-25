import styles from "./MonthlyTx.module.scss";
import { dashboardApi } from "../../../api/admin/dashboardApi";
import { useEffect, useState } from "react";
import { DashboardMonthlyTxDto } from "../../../types/admin/dashboard";

const MonthlyTx = () => {
  const [data, setData] = useState<DashboardMonthlyTxDto | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await dashboardApi.getMonthlyTxStats();
        console.log("Dashboard API 응답:", res);
        setData(res);
      } catch (err) {
        console.error("월간 거래현황 로딩 실패:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>📊 이번달 거래현황</h2>
      {data ? (
        <ul className={styles.list}>
          <li>
            <span>거래수</span>
            <strong>{(data.totalTx ?? 0).toLocaleString()}건</strong>
          </li>
          <li>
            <span>거래 취소수</span>
            <strong>{(data.cancelTx ?? 0).toLocaleString()}건</strong>
          </li>
          <li>
            <span>거래 확정수</span>
            <strong>{(data.completeTx ?? 0).toLocaleString()}건</strong>
          </li>
          <li>
            <span>총 매출 금액</span>
            <strong>{(data.totalAmt ?? 0).toLocaleString()}원</strong>
          </li>
        </ul>
      ) : (
        <p>📡 데이터를 불러오는 중...</p>
      )}
    </div>
  );
};

export default MonthlyTx;

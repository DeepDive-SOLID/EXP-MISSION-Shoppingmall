import { useEffect, useState } from "react";
import { dashboardApi } from "../../../api";
import styles from "./ProductStats.module.scss";
import { DashboardProductStatsDto } from "../../../types/admin/dashboard";

const ProductStats = () => {
  const [data, setData] = useState<DashboardProductStatsDto | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await dashboardApi.getProductStats(); // ✅ axios -> dashboardApi 변경
        console.log("Product Stats 응답:", res);
        setData(res);
      } catch (err) {
        console.error("상품 현황 통계 로딩 실패:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>📦 현재 상품 현황</h2>
      {data ? (
        <ul className={styles.list}>
          <li>
            <span>총 상품 수</span>
            <strong>{data.totalTravelProducts.toLocaleString()}개</strong>
          </li>
          <li>
            <span>품절 상품 수</span>
            <strong>{data.soldOutTravelProducts.toLocaleString()}개</strong>
          </li>
        </ul>
      ) : (
        <p>📡 데이터를 불러오는 중...</p>
      )}
    </div>
  );
};

export default ProductStats;

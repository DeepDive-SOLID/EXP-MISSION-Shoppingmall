import { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import styles from "./CategoryStats.module.scss";

ChartJS.register(ArcElement, Tooltip, Legend);

type DashboardCategoryStatsDto = {
  categoryName: string;
  totalAmount: number;
};

const CategoryStats = () => {
  const [categoryStats, setCategoryStats] = useState<
    DashboardCategoryStatsDto[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<DashboardCategoryStatsDto[]>(
          "/api/admin/dashboard/getDashboardCategoryStatsDto",
        );
        console.log("📦 Category Stats 응답:", res.data);
        setCategoryStats(res.data);
      } catch (err) {
        console.error("📉 카테고리 통계 로딩 실패:", err);
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: categoryStats.map(item => item.categoryName),
    datasets: [
      {
        label: "카테고리별 거래 수",
        data: categoryStats.map(item => item.totalAmount),
        backgroundColor: [
          "#0085FF",
          "#00C2FF",
          "#83E0FF",
          "#D1EEFF",
          "#EAF6FF",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right" as const,
        labels: {
          boxWidth: 16,
          padding: 12,
        },
      },
    },
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>🗂️ 거래 물품 카테고리 통계</h2>
      <div className={styles.chartWrapper}>
        {categoryStats.length > 0 ? (
          <Pie data={data} options={options} />
        ) : (
          <p>📡 데이터를 불러오는 중...</p>
        )}
      </div>
    </div>
  );
};

export default CategoryStats;

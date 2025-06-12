import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import styles from "./CategoryStats.module.scss";

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryStats = () => {
  const data = {
    labels: ["우산", "캐리어", "목베개", "스노클", "일회용품"],
    datasets: [
      {
        label: "카테고리별 거래 수",
        data: [12, 19, 8, 15, 6],
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
        position: "right",
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
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default CategoryStats;

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import styles from "./WeeklySalesAmt.module.scss";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
);

const WeeklySalesChart = () => {
  const data = {
    labels: ["1일", "2일", "3일", "4일", "5일", "6일", "7일"],
    datasets: [
      {
        label: "일별 거래 금액",
        data: [20000, 30000, 18000, 25000, 40000, 32000, 37000],
        fill: false,
        borderColor: "#0085FF",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          autoSkip: false, // 기본은 true — false면 모든 라벨 표시
          maxRotation: 0, // 라벨 회전 안 함
          minRotation: 0,
          padding: 4,
        },
      },
      y: {
        ticks: {
          callback: (value: unknown) => {
            if (typeof value === "number") {
              return new Intl.NumberFormat("ko-KR").format(value) + "원";
            }
            return value;
          },
        },
      },
    },
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>📈 주간 거래 금액 통계</h2>
      <div className={styles.chartWrapper}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default WeeklySalesChart;

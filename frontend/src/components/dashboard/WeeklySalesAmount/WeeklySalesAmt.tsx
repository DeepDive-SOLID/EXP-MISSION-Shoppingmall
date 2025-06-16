import { useEffect, useState } from "react";
import axios from "axios";
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
import { DashboardWeeklySalesAmtDto } from "../../../types/dashboard";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
);

const WeeklySalesChart = () => {
  const [weeklyData, setWeeklyData] = useState<DashboardWeeklySalesAmtDto[]>(
    [],
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<DashboardWeeklySalesAmtDto[]>(
          "/api/admin/dashboard/getDashboardWeeklySalesAmtDto",
        );
        console.log("Weekly Sales 응답:", res.data);
        setWeeklyData(res.data);
      } catch (err) {
        console.error("주간 매출 통계 로딩 실패:", err);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: weeklyData.map(item => {
      const date = new Date(item.date);
      return `${date.getDate()}일`;
    }),
    datasets: [
      {
        label: "일별 거래 금액",
        data: weeklyData.map(item => item.amount),
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
          autoSkip: false,
          maxRotation: 0,
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
        {weeklyData.length > 0 ? (
          <Line data={chartData} options={options} />
        ) : (
          <p>📡 데이터를 불러오는 중...</p>
        )}
      </div>
    </div>
  );
};

export default WeeklySalesChart;

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
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
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

  return <Line data={data} options={options} />;
};

export default WeeklySalesChart;

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryStats = () => {
  const data = {
    labels: ["우산", "샤워기필터", "썬크림", "보조배터리", "일회용품"],
    datasets: [
      {
        label: "카테고리별 거래 수",
        data: [12, 19, 8, 15, 6], // 실제 데이터로 교체
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

  return <Pie data={data} />;
};
export default CategoryStats;

import CategoryStats from "../CategoryStatistics/CategoryStats";
import ProductStats from "../CurrentProductStatus/ProductStats";
import MonthlyTx from "../MonthlyTransaction/MonthlyTx";
import WeeklySalesChart from "../WeeklySalesAmount/WeeklySalesAmt";
import styles from "./MainDashboard.module.scss";

const MainDashboard = () => {
  return (
    <div className={styles.mainDashboard}>
      <div className={styles.grid}>
        <div className={styles.card}>
          <MonthlyTx />
        </div>
        <div className={styles.card}>
          <CategoryStats />
        </div>
        <div className={styles.card}>
          <ProductStats />
        </div>
        <div className={styles.card}>
          <WeeklySalesChart />
        </div>
      </div>
    </div>
  );
};
export default MainDashboard;

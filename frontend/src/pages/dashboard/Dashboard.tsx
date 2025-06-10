import Header from "../../components/common/Header/Header";
import styles from "./Dashboard.module.scss";
import Sidebar from "../../components/common/Sidebar/Sidebar";

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <Header />
      <div className={styles.content}>
        <Sidebar />
        <div className={styles.mainContent}>
          <h1>대시보드</h1>
          {/* Dashboard content will go here */}
        </div>
      </div>
    </div>
  );
};
export default Dashboard;

import Header from "../../../components/common/Header_dash/Header";
import styles from "./Dashboard.module.scss";
import Sidebar from "../../../components/common/Sidebar/Sidebar";
import MainDashboard from "../../../components/dashboard/MainDashboard/MainDashboard";

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <Header />
      <div className={styles.mainContent}>
        <Sidebar />
        <MainDashboard />
      </div>
    </div>
  );
};
export default Dashboard;

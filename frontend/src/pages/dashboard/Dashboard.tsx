import Header from "../../components/common/Header/Header";
import styles from "./Dashboard.module.scss";
import Sidebar from "../../components/common/Sidebar/Sidebar";

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <Header />
      <Sidebar />
    </div>
  );
};
export default Dashboard;

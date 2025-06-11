import styles from "./MainDashboard.module.scss";

const MainDashboard = () => {
  return (
    <div className={styles.mainDashboard}>
      <div className={styles.content}>
        <h1>Main Dashboard</h1>
        <p>Welcome to the main dashboard!</p>
      </div>
    </div>
  );
};
export default MainDashboard;

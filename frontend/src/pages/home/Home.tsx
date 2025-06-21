import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";
import styles from "./Home.module.scss";
import { FiArrowRight } from "react-icons/fi";

const Home = () => {
  const navigate = useNavigate();
  const today = formatDate(new Date());

  return (
    <div className={styles.homeContainer}>
      <div className={styles.content}>
        <h1 className={styles.title}>초기 페이지입니다.</h1>
        <p className={styles.date}>오늘 날짜: {today}</p>
        <p className={styles.description}>
          관리자 페이지에서 상품, 주문, 사용자를 관리하세요.
        </p>
        <button
          className={styles.dashboardButton}
          onClick={() => navigate("/dashboard")}
        >
          관리자 페이지로 이동 <FiArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Home;

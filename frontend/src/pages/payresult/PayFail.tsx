import Header from "../../components/common/Header_login/Header";
import { FaTimesCircle } from "react-icons/fa";
import styles from "./payResult.module.scss";
import { home_banner } from "../../assets";
import { useNavigate } from "react-router-dom";

const PayFail = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.wrapper}>
      <Header />
      <img src={home_banner} alt="배경 이미지" className={styles.bg} />
      <div className={styles.resultBox}>
        <FaTimesCircle className={styles.failIcon} />
        <p className={styles.username}>
          <span>이나영</span>
          님의
        </p>

        <p className={styles.resultFailText}>결제를 실패하였습니다.</p>

        <div className={styles.failMessage}>
          잔액이 부족합니다.
          <br />
          다른 결제 수단을 이용해 주세요.
        </div>

        <button
          className={styles.retryButton}
          onClick={() => navigate("/order")}
        >
          결제하러 가기
        </button>
      </div>
    </div>
  );
};

export default PayFail;

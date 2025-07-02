import Header from "../../components/common/Header/Header";
import { FaTimesCircle } from "react-icons/fa";
import styles from "./payResult.module.scss";
import { home_banner } from "../../assets";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

const PayFail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { memberName } = location.state || { memberName: "고객" };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.wrapper}>
      <Header />
      <img src={home_banner} alt="배경 이미지" className={styles.bg} />
      <div className={styles.resultBox}>
        <FaTimesCircle className={styles.failIcon} />
        <p className={styles.username}>
          <span>{memberName}</span> 님의
        </p>

        <p className={styles.resultFailText}>결제를 실패하였습니다.</p>

        <div className={styles.failMessage}>
          결제 과정에서 문제가 발생했습니다.
          <br />
          잠시 후 다시 시도해 주세요.
        </div>

        <button
          className={styles.retryButton}
          onClick={() => navigate("/cart")}
        >
          결제하러 가기
        </button>
      </div>
    </div>
  );
};

export default PayFail;

import Header from "../../components/common/Header_login/Header";
import { home_banner } from "../../assets";
import { FaCheckCircle } from "react-icons/fa";
import styles from "./payResult.module.scss";

const PaySuccess = () => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <img src={home_banner} alt="배경 이미지" className={styles.bg} />
      <div className={styles.resultBox}>
        <FaCheckCircle className={styles.successIcon} />
        <p className={styles.username}>
          <span className={styles.name}>이나영</span>
          님의
        </p>

        <p className={styles.resultText}>결제가 완료되었습니다</p>

        <div className={styles.detailBox}>
          <div className={styles.detailRow}>
            <span>여행 정보</span>
            <span>부산 여행</span>
          </div>
          <div className={styles.detailRow}>
            <span>여행 일자</span>
            <span>2025.06.02 - 2025.06.03</span>
          </div>
          <div className={styles.detailRow}>
            <span>인원</span>
            <span>1명</span>
          </div>
          <div className={styles.detailRow}>
            <span>추가 구매 상품</span>
            <span>
              우산 1개
              <br />
              <small>1,000원</small>
            </span>
          </div>
        </div>

        <div className={styles.totalRow}>
          <span>총 결제 내역</span>
          <span className={styles.totalPrice}>21,000원</span>
        </div>
      </div>
    </div>
  );
};

export default PaySuccess;

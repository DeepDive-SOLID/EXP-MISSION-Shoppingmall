import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AddComplete.module.scss";
import { FiCheckCircle } from "react-icons/fi";
import Header from "../../../../components/common/Header_login/Header";
import Sidebar from "../../../../components/common/Sidebar_mypage/Sidebar";
import addCompleteImage from "../../../../assets/images/addComplete.jpg";

const AddComplete = () => {
  const navigate = useNavigate();
  const userName = "사용자";

  const handleGoToPayment = () => {
    // 결제 페이지로 이동하는 로직 (현재는 홈으로 이동)
    navigate("/");
  };

  const handleGoToCardInfo = () => {
    navigate("/mypage/card-info");
  };

  return (
    <div className={styles.addCompletePage}>
      <Header />
      <div className={styles.mainContent}>
        <Sidebar userName={userName} />
        <div className={styles.addCompleteContainer}>
          <div className={styles.addCompleteBox}>
            <FiCheckCircle className={styles.icon} />
            <h1 className={styles.title}>
              <span className={styles.highlight}>카드 등록</span>이
              완료되었습니다.
            </h1>
            <img
              src={addCompleteImage}
              alt="카드 등록 완료"
              className={styles.completeImage}
            />
            <div className={styles.actions}>
              <button
                className={styles.primaryButton}
                onClick={handleGoToPayment}
              >
                결제하러 가기
              </button>
              <button
                className={styles.secondaryButton}
                onClick={handleGoToCardInfo}
              >
                카드 관리 페이지로 이동
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddComplete;

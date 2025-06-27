import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AddFail.module.scss";
import { FiXCircle } from "react-icons/fi";
import Header from "../../../../components/common/Header_login/Header";
import Sidebar from "../../../../components/common/Sidebar_mypage/Sidebar";
import addFailImage from "../../../../assets/images/addFail.jpg";

const AddFail = () => {
  const navigate = useNavigate();

  const handleRetry = () => {
    navigate("/mypage/card-add");
  };

  return (
    <div className={styles.addFailPage}>
      <Header />
      <div className={styles.mainContent}>
        <Sidebar />
        <div className={styles.addFailContainer}>
          <div className={styles.addFailBox}>
            <FiXCircle className={styles.icon} />
            <h1 className={styles.title}>
              <span className={styles.highlight}>카드 등록</span> 실패
            </h1>
            <div className={styles.message}>
              <p>카드를 추가하지 못했습니다.</p>
              <p>다시 시도해주세요.</p>
            </div>
            <img
              src={addFailImage}
              alt="카드 등록 실패"
              className={styles.failImage}
            />
            <div className={styles.actions}>
              <button className={styles.retryButton} onClick={handleRetry}>
                카드 등록하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFail;

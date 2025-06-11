import styles from "./MonthlyTx.module.scss";

const MonthlyTx = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>📊 이번달 거래현황</h2>
      <ul className={styles.list}>
        <li>
          <span>거래수</span>
          <strong>128건</strong>
        </li>
        <li>
          <span>거래 취소수</span>
          <strong>12건</strong>
        </li>
        <li>
          <span>거래 확정수</span>
          <strong>116건</strong>
        </li>
        <li>
          <span>총 매출 금액</span>
          <strong>₩3,560,000</strong>
        </li>
      </ul>
    </div>
  );
};

export default MonthlyTx;

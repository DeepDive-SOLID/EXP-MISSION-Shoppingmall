import styles from "./ProductStats.module.scss";

const ProductStats = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>📦 현재 상품 현황</h2>
      <ul className={styles.list}>
        <li>
          <span>총 상품 수</span>
          <strong>340개</strong>
        </li>
        <li>
          <span>품절 상품 수</span>
          <strong>27개</strong>
        </li>
      </ul>
    </div>
  );
};

export default ProductStats;

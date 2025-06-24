import { useState } from "react";
import { carrier } from "../../../assets";
import styles from "./OrderProduct.module.scss";

const initialItems = [
  {
    id: 1,
    title: "부산여행",
    days: "1박 2일",
    date: "(2025.06.02~2025.06.03)",
    basePrice: 20000,
    extraPrice: 1000,
    personCount: 1,
    extraCount: 1,
  },
];

const OrderProduct = () => {
  const [items, setItems] = useState(initialItems);

  const handlePersonChange = (id: number, delta: number) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, personCount: Math.max(1, item.personCount + delta) }
          : item,
      ),
    );
  };

  const handleExtraChange = (id: number, delta: number) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, extraCount: Math.max(0, item.extraCount + delta) }
          : item,
      ),
    );
  };

  return (
    <div className={styles.cartContentWrapper}>
      <h2 className={styles.pageTitle}>예약하기</h2>

      <div className={styles.productList}>
        {items.map(item => {
          const baseTotal = item.basePrice * item.personCount;
          const extraTotal = item.extraPrice * item.extraCount;
          const total = baseTotal + extraTotal;

          return (
            <div key={item.id} className={styles.productSection}>
              <div className={styles.leftSection}>
                <img src={carrier} alt="여행 이미지" />
              </div>

              <div className={styles.rightSection}>
                <div className={styles.topRow}>
                  <div className={styles.travelInfo}>
                    <p className={styles.title}>{item.title}</p>
                    <p className={styles.days}>{item.days}</p>
                    <p className={styles.date}>{item.date}</p>
                  </div>

                  <div className={styles.extra}>
                    <p className={styles.extraTitle}>추가 구매 내역</p>
                    <div className={styles.extraItem}>
                      <span>우산</span>
                      <div className={styles.amount}>
                        <button onClick={() => handleExtraChange(item.id, -1)}>
                          -
                        </button>
                        <span>{item.extraCount}</span>
                        <button onClick={() => handleExtraChange(item.id, 1)}>
                          +
                        </button>
                      </div>
                      <span className={styles.unit}>{item.extraCount}개</span>
                    </div>
                  </div>
                </div>

                <div className={styles.personBox}>
                  <p className={styles.label}>인원</p>
                  <span className={styles.people}>{item.personCount}명</span>
                  <p className={styles.price}>
                    {(item.basePrice * item.personCount).toLocaleString()}원
                  </p>
                  <div className={styles.amount}>
                    <button onClick={() => handlePersonChange(item.id, -1)}>
                      -
                    </button>
                    <span>{item.personCount}</span>
                    <button onClick={() => handlePersonChange(item.id, 1)}>
                      +
                    </button>
                  </div>
                </div>

                <div className={styles.summary}>
                  <p>총 합계</p>
                  <span className={styles.totalPrice}>
                    {total.toLocaleString()}원
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default OrderProduct;

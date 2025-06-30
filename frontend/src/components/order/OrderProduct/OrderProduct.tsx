import { useEffect, useState } from "react";
import styles from "./OrderProduct.module.scss";
import { BasketListDto } from "../../../types/basket/basket";

interface OrderProductProps {
  selectedItems: BasketListDto[];
}

const OrderProduct = ({ selectedItems }: OrderProductProps) => {
  const [items, setItems] = useState<
    (BasketListDto & { personCount: number; extraCount: number })[]
  >([]);

  useEffect(() => {
    const initialized = selectedItems.map(item => ({
      ...item,
      personCount: item.basketTravelAmount,
      extraCount: item.basketProductAmount,
    }));
    setItems(initialized);
  }, [selectedItems]);

  const handlePersonChange = (id: number, delta: number) => {
    setItems(prev =>
      prev.map(item =>
        item.basketId === id
          ? { ...item, personCount: Math.max(1, item.personCount + delta) }
          : item,
      ),
    );
  };

  const handleExtraChange = (id: number, delta: number) => {
    setItems(prev =>
      prev.map(item =>
        item.basketId === id
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
          const baseTotal = item.travelPrice * item.personCount;
          const extraTotal = item.productPrice * item.extraCount;
          const total = baseTotal + extraTotal;

          return (
            <div key={item.basketId} className={styles.productSection}>
              <div className={styles.leftSection}>
                <img
                  src={`http://localhost:8080/solid${item.travelImg}`}
                  alt="여행 이미지"
                />
              </div>

              <div className={styles.rightSection}>
                <div className={styles.topRow}>
                  <div className={styles.travelInfo}>
                    <p className={styles.title}>{item.travelName}</p>
                    <p className={styles.days}>
                      {item.travelStartDt.slice(0, 10)} ~{" "}
                      {item.travelEndDt.slice(0, 10)}
                    </p>
                  </div>

                  <div className={styles.extra}>
                    <p className={styles.extraTitle}>추가 구매 내역</p>
                    <div className={styles.extraItem}>
                      <span>{item.productName}</span>
                      <div className={styles.amount}>
                        <button
                          onClick={() => handleExtraChange(item.basketId, -1)}
                        >
                          -
                        </button>
                        <span>{item.extraCount}</span>
                        <button
                          onClick={() => handleExtraChange(item.basketId, 1)}
                        >
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
                    {(item.travelPrice * item.personCount).toLocaleString()}원
                  </p>
                  <div className={styles.amount}>
                    <button
                      onClick={() => handlePersonChange(item.basketId, -1)}
                    >
                      -
                    </button>
                    <span>{item.personCount}</span>
                    <button
                      onClick={() => handlePersonChange(item.basketId, 1)}
                    >
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

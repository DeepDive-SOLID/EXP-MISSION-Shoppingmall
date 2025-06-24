import { useState } from "react";
import Header from "../../components/common/Header_login/Header";
import styles from "./Cart.module.scss";
import { carrier } from "../../assets";

const initialItems = [
  {
    id: 1,
    title: "부산여행",
    days: "1박 2일",
    date: "(2025.06.02~2025.06.03)",
    basePrice: 20000,
    extraPrice: 1000,
    quantity: 1,
    checked: false,
  },
  {
    id: 2,
    title: "경주여행",
    days: "1박 2일",
    date: "(2025.06.04~2025.06.05)",
    basePrice: 20000,
    extraPrice: 1000,
    quantity: 1,
    checked: false,
  },
];

const Cart = () => {
  const [items, setItems] = useState(initialItems);
  const allChecked = items.every(item => item.checked);

  const handleToggleAll = () => {
    setItems(items.map(item => ({ ...item, checked: !allChecked })));
  };

  const handleToggleItem = (id: number) => {
    setItems(
      items.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item,
      ),
    );
  };

  const handleQuantityChange = (id: number, delta: number) => {
    setItems(
      items.map(item =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + delta),
            }
          : item,
      ),
    );
  };

  const handleRemove = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const selectedItems = items.filter(item => item.checked);
  const totalBase = selectedItems.reduce(
    (sum, item) => sum + item.basePrice,
    0,
  );
  const totalExtra = selectedItems.reduce(
    (sum, item) => sum + item.extraPrice * item.quantity,
    0,
  );
  const total = totalBase + totalExtra;

  return (
    <div>
      <Header />
      <div className={styles.cartContainer}>
        <p className={styles.header}>장바구니</p>

        <div className={styles.checklist}>
          <input
            type="checkbox"
            id="checkAll"
            checked={allChecked}
            onChange={handleToggleAll}
          />
          <label htmlFor="checkAll">전체 선택</label>
        </div>

        <div className={styles.cartContentWrapper}>
          {/* 상품 목록 */}
          <div className={styles.productList}>
            {items.map(item => (
              <div key={item.id} className={styles.productSection}>
                <button
                  className={styles.removeButton}
                  onClick={() => handleRemove(item.id)}
                >
                  x
                </button>
                <input
                  type="checkbox"
                  className={styles.productCheckbox}
                  checked={item.checked}
                  onChange={() => handleToggleItem(item.id)}
                />

                <div className={styles.leftSection}>
                  <img src={carrier} alt="여행 이미지" />
                </div>

                <div className={styles.rightSection}>
                  <div className={styles.travelInfo}>
                    <p className={styles.title}>{item.title}</p>
                    <p className={styles.days}>{item.days}</p>
                    <p className={styles.date}>{item.date}</p>
                    <button className={styles.changeButton}>변경</button>
                  </div>

                  <div className={styles.extraAndPrice}>
                    <div className={styles.extra}>
                      <p className={styles.extraTitle}>추가 구매 내역</p>
                      <div className={styles.extraItem}>
                        <span>우산</span>
                        <div className={styles.amount}>
                          <button
                            onClick={() => handleQuantityChange(item.id, -1)}
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.id, 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className={styles.summary}>
                      <p>총 합계</p>
                      <span className={styles.totalPrice}>
                        {(
                          item.basePrice +
                          item.extraPrice * item.quantity
                        ).toLocaleString()}
                        원
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 총 금액 정보 */}
          <div className={styles.totalPriceSection}>
            <p className={styles.summaryTitle}>구매 금액</p>

            <div className={styles.priceRow}>
              <p>상품 금액</p>
              <span>{totalBase.toLocaleString()}원</span>
            </div>

            <div className={styles.priceRow}>
              <p>추가 상품 금액</p>
              <span>{totalExtra.toLocaleString()}원</span>
            </div>

            <div className={styles.finalRow}>
              <p>총 금액</p>
              <span className={styles.finalPrice}>
                {total.toLocaleString()}원
              </span>
            </div>

            <button className={styles.payButton}>결제하기</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

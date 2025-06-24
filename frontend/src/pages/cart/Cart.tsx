import Header from "../../components/common/Header_login/Header";
import styles from "./Cart.module.scss";
import { carrier } from "../../assets/index";

const Cart = () => {
  return (
    <div>
      <Header />
      <div className={styles.cartContainer}>
        <p className={styles.header}>장바구니</p>

        <div className={styles.checklist}>
          <input type="checkbox" id="checkAll" />
          <label htmlFor="checkAll">전체 선택</label>
        </div>

        <div className={styles.cartContentWrapper}>
          <div className={styles.productList}>
            <div className={styles.productSection}>
              <input type="checkbox" className={styles.productCheckbox} />

              <div className={styles.leftSection}>
                <img src={carrier} alt="여행 이미지" />
              </div>

              <div className={styles.rightSection}>
                <div className={styles.travelInfo}>
                  <p className={styles.title}>부산여행</p>
                  <p className={styles.days}>1박 2일</p>
                  <p className={styles.date}>(2025.06.02~2025.06.03)</p>
                  <button className={styles.changeButton}>변경</button>
                </div>

                <div className={styles.extraAndPrice}>
                  <div className={styles.extra}>
                    <p className={styles.extraTitle}>추가 구매 내역</p>
                    <div className={styles.extraItem}>
                      <span>우산</span>
                      <div className={styles.amount}>
                        <button>-</button>
                        <span>1</span>
                        <button>+</button>
                      </div>
                    </div>
                  </div>

                  <div className={styles.summary}>
                    <p>총 합계</p>
                    <span className={styles.totalPrice}>21,000원</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.productSection}>
              <input type="checkbox" className={styles.productCheckbox} />

              <div className={styles.leftSection}>
                <img src={carrier} alt="여행 이미지" />
              </div>

              <div className={styles.rightSection}>
                <div className={styles.travelInfo}>
                  <p className={styles.title}>부산여행</p>
                  <p className={styles.days}>1박 2일</p>
                  <p className={styles.date}>(2025.06.02~2025.06.03)</p>
                  <button className={styles.changeButton}>변경</button>
                </div>

                <div className={styles.extraAndPrice}>
                  <div className={styles.extra}>
                    <p className={styles.extraTitle}>추가 구매 내역</p>
                    <div className={styles.extraItem}>
                      <span>우산</span>
                      <div className={styles.amount}>
                        <button>-</button>
                        <span>1</span>
                        <button>+</button>
                      </div>
                    </div>
                  </div>

                  <div className={styles.summary}>
                    <p>총 합계</p>
                    <span className={styles.totalPrice}>21,000원</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.totalPriceSection}>
            <p className={styles.summaryTitle}>구매 금액</p>

            <div className={styles.priceRow}>
              <p>상품 금액</p>
              <span>20,000원</span>
            </div>

            <div className={styles.priceRow}>
              <p>추가 상품 금액</p>
              <span>1,000원</span>
            </div>

            <div className={styles.finalRow}>
              <p>총 금액</p>
              <span className={styles.finalPrice}>21,000원</span>
            </div>

            <button className={styles.payButton}>결제하기</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

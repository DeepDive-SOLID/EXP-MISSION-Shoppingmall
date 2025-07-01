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

  // 초기값 설정: 장바구니 항목에 수량 정보 추가
  useEffect(() => {
    const initialized = selectedItems.map(item => ({
      ...item,
      personCount: item.basketTravelAmount,
      extraCount: item.basketProductAmount,
      basketProducts: item.basketProducts ?? [],
    }));
    setItems(initialized);
  }, [selectedItems]);

  return (
    <div className={styles.cartContentWrapper}>
      <h2 className={styles.pageTitle}>예약하기</h2>

      <div className={styles.productList}>
        {items.map(item => {
          const baseTotal = item.travelPrice * item.personCount;
          const extraTotal = item.basketProducts.reduce(
            (sum, product) =>
              sum + (product.productPrice ?? 0) * product.basketProductAmount,
            0,
          );

          const total = baseTotal + extraTotal;

          return (
            <div key={item.basketId} className={styles.productSection}>
              <div className={styles.leftSection}>
                <img src={item.travelImg} alt="여행 이미지" />
              </div>

              <div className={styles.rightSection}>
                <div className={styles.topRow}>
                  <div className={styles.travelInfo}>
                    <p className={styles.title}>{item.travelName}</p>
                    <p className={styles.days}>
                      {item.travelStartDt.slice(0, 10)} ~{" "}
                      {item.travelEndDt.slice(0, 10)}
                    </p>

                    <div className={styles.personBox}>
                      <p className={styles.label}>인원</p>
                      <span className={styles.people}>
                        {item.personCount}명
                      </span>
                      <p className={styles.price}>
                        {(item.travelPrice * item.personCount).toLocaleString()}
                        원
                      </p>
                    </div>
                  </div>

                  <div className={styles.extra}>
                    <p className={styles.extraTitle}>추가 구매 내역</p>
                    {item.basketProducts.length > 0 ? (
                      <div className={styles.extraItemWrapper}>
                        {item.basketProducts.map((product, index) => (
                          <div key={index} className={styles.extraItem}>
                            <span className={styles.name}>
                              {product.productName}
                            </span>
                            <span className={styles.unit}>
                              {product.basketProductAmount}개
                            </span>
                            <span className={styles.price}>
                              {(
                                (product.productPrice ?? 0) *
                                product.basketProductAmount
                              ).toLocaleString()}
                              원
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className={styles.noExtra}></p>
                    )}
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

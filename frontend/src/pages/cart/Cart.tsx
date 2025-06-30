import { useEffect, useState } from "react";
import Header from "../../components/common/Header/Header";
import styles from "./Cart.module.scss";
import { fetchBasketList, deleteFromBasket } from "../../api/basket/basketApi";
import { BasketListDto } from "../../types/basket/basket";
import { getCurrentMemberId } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import CounterBox from "../../components/common/CounterBox/CounterBox";

const Cart = () => {
  const [items, setItems] = useState<(BasketListDto & { checked: boolean })[]>(
    [],
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const memberId = getCurrentMemberId();
        if (!memberId) throw new Error("로그인 정보가 없습니다.");

        const res = await fetchBasketList(memberId);

        const withChecked = res.map(item => ({ ...item, checked: false }));
        setItems(withChecked);
      } catch (err) {
        console.error("장바구니 로딩 실패:", err);
      }
    };

    fetchData();
  }, []);

  const allChecked = items.length > 0 && items.every(item => item.checked);

  const navigate = useNavigate();

  const handleToggleAll = () => {
    setItems(items.map(item => ({ ...item, checked: !allChecked })));
  };

  const handleToggleItem = (basketId: number) => {
    setItems(
      items.map(item =>
        item.basketId === basketId ? { ...item, checked: !item.checked } : item,
      ),
    );
  };

  const handleQuantityChange = (basketId: number, delta: number) => {
    setItems(
      items.map(item =>
        item.basketId === basketId
          ? {
              ...item,
              basketProductAmount: Math.max(
                1,
                item.basketProductAmount + delta,
              ),
            }
          : item,
      ),
    );
  };

  const handleRemove = async (basketId: number) => {
    try {
      await deleteFromBasket({ basketId });
      setItems(prev => prev.filter(item => item.basketId !== basketId));
    } catch (err) {
      console.error("삭제 실패:", err);
      alert("장바구니 삭제에 실패했습니다.");
    }
  };

  const selectedItems = items.filter(item => item.checked);
  const totalBase = selectedItems.reduce(
    (sum, item) => sum + item.travelPrice * item.basketTravelAmount,
    0,
  );
  const totalExtra = selectedItems.reduce(
    (sum, item) => sum + item.productPrice * item.basketProductAmount,
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
          <div className={styles.productList}>
            {items.map(item => (
              <div key={item.basketId} className={styles.productSection}>
                <button
                  className={styles.removeButton}
                  onClick={() => handleRemove(item.basketId)}
                >
                  x
                </button>
                <input
                  type="checkbox"
                  className={styles.productCheckbox}
                  checked={item.checked}
                  onChange={() => handleToggleItem(item.basketId)}
                />

                <div className={styles.leftSection}>
                  <img
                    src={`http://localhost:8080/solid${item.travelImg}`}
                    alt="여행 이미지"
                  />
                </div>

                <div className={styles.rightSection}>
                  <div className={styles.travelInfo}>
                    <p className={styles.title}>{item.travelName}</p>
                    <p className={styles.date}>
                      {item.travelStartDt.slice(0, 10)} ~{" "}
                      {item.travelEndDt.slice(0, 10)}
                    </p>
                    <button
                      className={styles.changeButton}
                      onClick={() =>
                        navigate(`/detail/${item.travelId}`, {
                          state: { travel: item },
                        })
                      }
                    >
                      변경
                    </button>
                  </div>

                  <div className={styles.extraAndPrice}>
                    <div className={styles.extra}>
                      <p className={styles.extraTitle}>추가 구매 내역</p>
                      <div className={styles.extraItem}>
                        <CounterBox
                          label={item.productName}
                          count={item.basketProductAmount}
                          price={item.productPrice}
                          onDecrease={() =>
                            handleQuantityChange(item.basketId, -1)
                          }
                          onIncrease={() =>
                            handleQuantityChange(item.basketId, 1)
                          }
                        />
                      </div>
                    </div>

                    <div className={styles.summary}>
                      <p>총 합계</p>
                      <span className={styles.totalPrice}>
                        {(
                          item.travelPrice * item.basketTravelAmount +
                          item.productPrice * item.basketProductAmount
                        ).toLocaleString()}
                        원
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

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

            <button
              className={styles.payButton}
              onClick={() =>
                navigate("/order", {
                  state: { selectedItems },
                })
              }
            >
              결제하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

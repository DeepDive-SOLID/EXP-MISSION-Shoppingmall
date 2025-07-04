import { useEffect, useState } from "react";
import Header from "../../components/common/Header/Header";
import styles from "./Cart.module.scss";
import { fetchBasketList, deleteFromBasket } from "../../api/basket/basketApi";
import { BasketListDto } from "../../types/basket/basket";
import { getCurrentMemberId } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import CounterBox from "../../components/common/CounterBox/CounterBox";
import { cart } from "../../assets";

const Cart = () => {
  const [items, setItems] = useState<(BasketListDto & { checked: boolean })[]>(
    [],
  );
  const navigate = useNavigate();

  // 장바구니 데이터 로딩
  useEffect(() => {
    const fetchData = async () => {
      try {
        const memberId = getCurrentMemberId();
        if (!memberId) throw new Error("로그인 정보가 없습니다.");

        const res = await fetchBasketList(memberId);
        console.log("서버 응답:", res);

        const cleaned = res.map(item => ({
          ...item,
          basketProducts: (item.basketProducts || []).filter(
            p => p.productId !== null && p.productName !== null,
          ),
          checked: false,
        }));

        setItems(cleaned);
      } catch (err) {
        console.error("장바구니 로딩 실패:", err);
      }
    };

    fetchData();
  }, []);

  // 전체 선택 상태 여부
  const allChecked = items.length > 0 && items.every(item => item.checked);

  // 전체 선택 토글
  const handleToggleAll = () => {
    setItems(items.map(item => ({ ...item, checked: !allChecked })));
  };

  // 개별 선택 토글
  const handleToggleItem = (basketId: number) => {
    setItems(
      items.map(item =>
        item.basketId === basketId ? { ...item, checked: !item.checked } : item,
      ),
    );
  };

  // 수량 변경
  const handleQuantityChange = (
    basketId: number,
    productId: number,
    delta: number,
  ) => {
    setItems(prev =>
      prev.map(item => {
        if (item.basketId !== basketId) return item;

        const updatedProducts = item.basketProducts.map(product =>
          product.productId === productId
            ? {
                ...product,
                basketProductAmount: Math.max(
                  1,
                  product.basketProductAmount + delta,
                ),
              }
            : product,
        );

        return {
          ...item,
          basketProducts: updatedProducts,
        };
      }),
    );
  };

  // 장바구니에서 항목 삭제
  const handleRemove = async (travelId: number) => {
    try {
      const memberId = getCurrentMemberId();
      if (!memberId) {
        alert("로그인이 필요합니다.");
        return;
      }

      await deleteFromBasket({ travelId, memberId });

      setItems(prev => prev.filter(item => item.travelId !== travelId));
    } catch (err) {
      console.error("삭제 실패:", err);
      alert("장바구니 삭제에 실패했습니다.");
    }
  };

  // 선택된 항목 및 총 가격 계산
  const selectedItems = items.filter(item => item.checked);
  const totalBase = selectedItems.reduce(
    (sum, item) => sum + item.travelPrice * item.basketTravelAmount,
    0,
  );
  const totalExtra = selectedItems.reduce((sum, item) => {
    return (
      sum +
      (item.basketProducts?.reduce(
        (subSum, product) =>
          subSum + (product.productPrice ?? 0) * product.basketProductAmount,
        0,
      ) ?? 0)
    );
  }, 0);

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
          {items.length === 0 ? (
            <div className={styles.emptyState}>
              <img src={cart} alt="빈 장바구니" className={styles.emptyImage} />

              <p className={styles.emptySubText}>
                장바구니에 담긴 상품이 없습니다.
              </p>
              <button
                className={styles.shopButton}
                onClick={() => navigate("/")}
              >
                쇼핑하러 가기
              </button>
            </div>
          ) : (
            <div className={styles.productList}>
              {items.map(item => (
                <div key={item.basketId} className={styles.productSection}>
                  <button
                    className={styles.removeButton}
                    onClick={() => handleRemove(item.travelId)}
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
                    <img src={item.travelImg} alt="여행 이미지" />
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
                        onClick={() => {
                          navigate(`/detail/${item.travelId}`, {
                            state: {
                              travel: {
                                travelId: item.travelId,
                                travelName: item.travelName,
                                travelStartDt: item.travelStartDt,
                                travelEndDt: item.travelEndDt,
                                travelImg: item.travelImg,
                                travelPrice: item.travelPrice,
                                travelAmount: item.travelAmount,
                                reservedCount: item.reservedCount,
                                travelLabel: item.travelLabel,
                                travelSold: item.travelSold,
                              },
                              basket: {
                                basketTravelAmount: item.basketTravelAmount,
                                basketProducts: item.basketProducts,
                              },
                              fromCart: true,
                            },
                          });
                        }}
                      >
                        변경
                      </button>
                    </div>

                    <div
                      className={styles.extraAndPrice}
                      style={{
                        flexDirection:
                          item.basketProducts.length > 0 ? "row" : "column",
                        alignItems:
                          item.basketProducts.length > 0
                            ? "flex-start"
                            : "flex-end",
                        justifyContent:
                          item.basketProducts.length > 0
                            ? "space-between"
                            : "initial",
                      }}
                    >
                      {item.basketProducts &&
                        item.basketProducts.length > 0 && (
                          <div className={styles.extra}>
                            <p className={styles.extraTitle}>추가 구매 내역</p>
                            {item.basketProducts.map((product, index) => (
                              <div key={index} className={styles.extraItem}>
                                <CounterBox
                                  label={product.productName ?? ""}
                                  count={product.basketProductAmount ?? 1}
                                  price={product.productPrice ?? 0}
                                  onDecrease={() =>
                                    handleQuantityChange(
                                      item.basketId,
                                      product.productId,
                                      -1,
                                    )
                                  }
                                  onIncrease={() =>
                                    handleQuantityChange(
                                      item.basketId,
                                      product.productId,
                                      1,
                                    )
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        )}

                      <div className={styles.summary}>
                        <p>총 합계</p>
                        <span className={styles.totalPrice}>
                          {(
                            item.travelPrice * item.basketTravelAmount +
                            item.basketProducts.reduce(
                              (sum, product) =>
                                sum +
                                (product.productPrice ?? 0) *
                                  product.basketProductAmount,
                              0,
                            )
                          ).toLocaleString()}
                          원
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
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
              onClick={async () => {
                if (selectedItems.length === 0) {
                  alert("결제할 상품을 선택해주세요.");
                  return;
                }

                const soldOutItems = selectedItems.filter(
                  item => item.travelSold,
                );

                if (soldOutItems.length > 0) {
                  const soldNames = soldOutItems
                    .map(item => `- ${item.travelName}`)
                    .join("\n");

                  alert(
                    `다음 상품은 품절되어 결제에서 제외되며 장바구니에서도 삭제됩니다:\n\n${soldNames}`,
                  );

                  const memberId = getCurrentMemberId();
                  if (!memberId) {
                    alert("회원 정보가 없습니다. 다시 로그인해주세요.");
                    return;
                  }

                  for (const item of soldOutItems) {
                    try {
                      await deleteFromBasket({
                        travelId: item.travelId,
                        memberId,
                      });
                    } catch (err) {
                      console.error(
                        `품절 상품 삭제 실패 (travelId=${item.travelId})`,
                        err,
                      );
                    }
                  }

                  setItems(prev =>
                    prev.filter(
                      item =>
                        !soldOutItems.some(
                          sold => sold.basketId === item.basketId,
                        ),
                    ),
                  );

                  return;
                }

                navigate("/order", {
                  state: { selectedItems },
                });
              }}
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

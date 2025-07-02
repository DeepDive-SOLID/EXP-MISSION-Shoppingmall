import styles from "./Info.module.scss";
import { people } from "../../../assets";
import { FaStar, FaComments, FaRegCalendarCheck } from "react-icons/fa6";
import CounterBox from "../../common/CounterBox/CounterBox";
import { useState, useEffect } from "react";
import { HomeTravelDto } from "../../../types/home/homeTravel";
import { ProductDto } from "../../../types/home/homeProduct";
import { ReviewDto } from "../../../types/home/review";
import { fetchProducts, fetchReviews } from "../../../api/home/homeApi";
import { useNavigate, useLocation } from "react-router-dom";
import { isLoggedIn, getCurrentMemberId } from "../../../utils/auth";
import {
  addToBasket,
  deleteFromBasket,
  fetchBasketList,
} from "../../../api/basket/basketApi";
import { BasketProductDto } from "../../../types/basket/basket";

interface InfoProps {
  travelId: number;
  travel: HomeTravelDto;
}

const Info = ({ travelId, travel }: InfoProps) => {
  const [productList, setProductList] = useState<ProductDto[]>([]);
  const [reviews, setReviews] = useState<ReviewDto[]>([]);
  const [peopleCount, setPeopleCount] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState<
    { id: number; label: string; price: number; count: number }[]
  >([]);
  const [selectedProductId, setSelectedProductId] = useState("");

  const location = useLocation();
  const fromCart = location.state?.fromCart;
  const basket = location.state?.basket;

  const navigate = useNavigate();

  // fromCart일 경우 초기화
  useEffect(() => {
    if (fromCart && basket) {
      setPeopleCount(basket.basketTravelAmount);
      setSelectedProducts(
        basket.basketProducts.map((p: BasketProductDto) => ({
          id: p.productId,
          label: p.productName ?? "",
          price: p.productPrice ?? 0,
          count: p.basketProductAmount,
        })),
      );
    }
  }, [fromCart, basket]);

  // 상품 및 리뷰 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await fetchProducts();
        const reviewData = await fetchReviews(travelId);
        setProductList(productData);
        setReviews(reviewData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [travelId]);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const productId = Number(e.target.value);
    setSelectedProductId("");

    const found = productList.find(p => p.productId === productId);
    if (!found) return;

    const exists = selectedProducts.some(p => p.id === productId);
    if (exists) return;

    setSelectedProducts(prev => [
      ...prev,
      {
        id: found.productId,
        label: found.productName,
        price: found.productPrice,
        count: 1,
      },
    ]);
  };

  const removeProduct = (id: number) => {
    setSelectedProducts(prev => prev.filter(p => p.id !== id));
  };

  const reviewCount = reviews.length;
  const averageRate =
    reviewCount === 0
      ? 0
      : reviews.reduce((sum, r) => sum + r.reviewRate, 0) / reviewCount;

  const totalCount =
    peopleCount + selectedProducts.reduce((sum, item) => sum + item.count, 0);
  const totalPrice =
    peopleCount * travel.travelPrice +
    selectedProducts.reduce((sum, item) => sum + item.count * item.price, 0);

  const checkIfAlreadyInCart = async (memberId: string, travelId: number) => {
    const basketList = await fetchBasketList(memberId);
    return basketList.some(item => item.travelId === travelId);
  };

  const handleCartClick = async () => {
    if (!isLoggedIn()) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    const memberId = getCurrentMemberId();
    if (!memberId) {
      alert("회원 정보를 확인할 수 없습니다.");
      return;
    }

    try {
      if (fromCart) {
        await deleteFromBasket({ travelId: travel.travelId, memberId });
      } else {
        const alreadyExists = await checkIfAlreadyInCart(
          memberId,
          travel.travelId,
        );
        if (alreadyExists) {
          alert("이미 장바구니에 담겨 있습니다.");
          navigate("/cart");
          return;
        }
      }

      console.log("장바구니에 담을 selectedProducts:", selectedProducts);
      console.log(
        "변환된 products 배열:",
        selectedProducts.map(item => ({
          productId: item.id,
          basketProductAmount: item.count,
        })),
      );

      await addToBasket({
        memberId,
        travelId: travel.travelId,
        basketTravelAmount: peopleCount,
        products:
          selectedProducts && selectedProducts.length > 0
            ? selectedProducts.map(item => ({
                productId: item.id,
                basketProductAmount: item.count,
              }))
            : [],
      });

      alert("장바구니에 담았습니다!");
      navigate("/cart");
    } catch (error) {
      console.error("장바구니 담기 실패:", error);
      alert("장바구니 담기에 실패했습니다.");
    }
  };

  const handleReserveClick = async () => {
    if (!isLoggedIn()) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    const memberId = getCurrentMemberId();
    if (!memberId) {
      alert("회원 정보를 확인할 수 없습니다.");
      return;
    }

    const alreadyExists = await checkIfAlreadyInCart(memberId, travel.travelId);
    if (alreadyExists) {
      alert("이미 장바구니에 담겨 있습니다. 장바구니에서 결제해주세요.");
      navigate("/cart");
      return;
    }

    try {
      await addToBasket({
        memberId,
        travelId: travel.travelId,
        basketTravelAmount: peopleCount,
        products:
          selectedProducts.length > 0
            ? selectedProducts.map(item => ({
                productId: item.id,
                basketProductAmount: item.count,
              }))
            : [],
      });

      navigate("/order", {
        state: {
          selectedItems: [
            {
              basketId: -1,
              travelId: travel.travelId,
              travelName: travel.travelName,
              travelImg: travel.travelImg,
              travelStartDt: travel.travelStartDt,
              travelEndDt: travel.travelEndDt,
              travelPrice: travel.travelPrice,
              basketTravelAmount: peopleCount,
              basketProductAmount: selectedProducts.reduce(
                (sum, p) => sum + p.count,
                0,
              ),
              basketProducts: selectedProducts.map(p => ({
                productId: p.id,
                productName: p.label,
                productPrice: p.price,
                basketProductAmount: p.count,
              })),
            },
          ],
        },
      });
    } catch (error) {
      console.error("예약 중 장바구니 추가 실패:", error);
      alert("예약 처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className={styles.rightSection}>
      <p className={styles.title}>{travel.travelName}</p>

      <div className={styles.infoBadge}>
        {travel.travelLabel?.split(",").map((label: string, idx: number) => (
          <span key={idx} className={styles.badge}>
            #{label.trim()}
          </span>
        ))}
      </div>

      <div className={styles.rate}>
        <FaStar className={styles.starIcon} />
        <span className={styles.starRating}>{averageRate.toFixed(1)}</span>
        <FaComments className={styles.commentIcon} />
        <span className={styles.commentCount}>{reviewCount}</span>
      </div>

      <div className={styles.detailInfo}>
        <div className={styles.dateInfo}>
          <FaRegCalendarCheck className={styles.calendarIcon} />
          <span className={styles.date}>
            {travel.travelStartDt} ~ {travel.travelEndDt}
          </span>
        </div>

        <div className={styles.personInfo}>
          <img src={people} alt="People Icon" className={styles.peopleIcon} />
          <div className={styles.personText}>
            <div className={styles.personTop}>
              <span className={styles.personCount}>
                잔여 개수 {travel.travelAmount}개
              </span>
              <span className={styles.minPeopleCount}>
                (현재 예약 인원 {travel.reservedCount ?? 0}명)
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.subProductInfo}>
        <p className={styles.subProductTitle}>추가 구매 상품</p>
        <select
          className={styles.productSelect}
          value={selectedProductId}
          onChange={handleSelect}
        >
          <option value="" disabled>
            상품을 선택하세요
          </option>
          {productList.map(product => (
            <option key={product.productId} value={product.productId}>
              {product.productName} (+
              {(product.productPrice ?? 0).toLocaleString()}원)
            </option>
          ))}
        </select>
      </div>

      {selectedProducts.length > 0 &&
        selectedProducts.map(item => (
          <div className={styles.productItem} key={item.id}>
            <span className={styles.productLabel}>{item.label}</span>
            <div className={styles.productControl}>
              <CounterBox
                label=""
                count={item.count}
                price={item.price}
                hidePrice={true}
                onDecrease={() =>
                  setSelectedProducts(prev =>
                    prev.map(p =>
                      p.id === item.id
                        ? { ...p, count: Math.max(1, p.count - 1) }
                        : p,
                    ),
                  )
                }
                onIncrease={() =>
                  setSelectedProducts(prev =>
                    prev.map(p =>
                      p.id === item.id ? { ...p, count: p.count + 1 } : p,
                    ),
                  )
                }
              />
              <span className={styles.productPrice}>
                {(item.count * item.price).toLocaleString()}원
              </span>
              <button
                className={styles.removeButton}
                onClick={() => removeProduct(item.id)}
                aria-label={`${item.label} 삭제`}
              >
                x
              </button>
            </div>
          </div>
        ))}

      <div className={styles.personItem}>
        <span className={styles.productLabel}>인원</span>
        <div className={styles.productControl}>
          <CounterBox
            label=""
            count={peopleCount}
            price={travel.travelPrice}
            hidePrice={true}
            onDecrease={() => setPeopleCount(prev => Math.max(1, prev - 1))}
            onIncrease={() =>
              setPeopleCount(prev => {
                const maxCount = travel.travelAmount ?? 0;
                return prev < maxCount ? prev + 1 : prev;
              })
            }
          />

          <span className={styles.productPrice}>
            {(peopleCount * travel.travelPrice).toLocaleString()}원
          </span>
        </div>
      </div>

      <div className={styles.totalprice}>
        <p className={styles.totalPriceCnt}>총 수량 {totalCount}개</p>
        <p className={styles.totalPrice}>{totalPrice.toLocaleString()}원</p>
      </div>

      <div className={styles.buttonSection}>
        {travel.travelSold ? (
          <p className={styles.soldOutMessage}>품절된 상품입니다.</p>
        ) : (
          <>
            <button className={styles.cartButton} onClick={handleCartClick}>
              장바구니
            </button>
            <button
              className={styles.reserveButton}
              onClick={handleReserveClick}
            >
              예약하기
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Info;

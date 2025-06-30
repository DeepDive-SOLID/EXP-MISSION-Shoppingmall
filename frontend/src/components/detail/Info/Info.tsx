import styles from "./Info.module.scss";
import { people } from "../../../assets";
import { FaStar, FaComments, FaRegCalendarCheck } from "react-icons/fa6";
import CounterBox from "../../common/CounterBox/CounterBox";
import { useState, useEffect } from "react";
import { HomeTravelDto } from "../../../types/home/homeTravel";
import { ProductDto } from "../../../types/home/homeProduct";
import { ReviewDto } from "../../../types/home/review";
import { fetchProducts, fetchReviews } from "../../../api/home/homeApi";
import { useNavigate } from "react-router-dom";
import { isLoggedIn, getCurrentMemberId } from "../../../utils/auth";
import { addToBasket } from "../../../api/basket/basketApi";

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

  // 상품 및 리뷰 데이터 불러오기
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

  // 상품 선택 시 추가
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const productId = Number(e.target.value);
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

  // 상품 수량 업데이트
  const updateProductCount = (id: number, delta: number) => {
    setSelectedProducts(prev =>
      prev
        .map(p =>
          p.id === id ? { ...p, count: Math.max(0, p.count + delta) } : p,
        )
        .filter(p => p.count > 0),
    );
  };

  // 선택된 상품 삭제
  const removeProduct = (id: number) => {
    setSelectedProducts(prev => prev.filter(p => p.id !== id));
  };

  // 리뷰 개수 및 평균 평점 계산
  const reviewCount = reviews.length;
  const averageRate =
    reviewCount === 0
      ? 0
      : reviews.reduce((sum, r) => sum + r.reviewRate, 0) / reviewCount;

  // 총 수량 및 총 가격 계산
  const totalCount =
    peopleCount + selectedProducts.reduce((sum, item) => sum + item.count, 0);

  const totalPrice =
    peopleCount * travel.travelPrice +
    selectedProducts.reduce((sum, item) => sum + item.count * item.price, 0);

  const navigate = useNavigate();

  // 장바구니 버튼 클릭 시 처리
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
      for (const item of selectedProducts) {
        await addToBasket({
          memberId,
          travelId: travel.travelId,
          productId: item.id,
          basketTravelAmount: peopleCount,
          basketProductAmount: item.count,
        });
      }

      alert("장바구니에 담았습니다!");
    } catch (error) {
      console.error("장바구니 담기 실패:", error);
      alert("장바구니 담기에 실패했습니다.");
    }
  };

  // 예약하기 버튼 클릭 시 처리
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

    navigate("/order", {
      state: {
        selectedItems: selectedProducts.map(item => ({
          basketId: item.id,
          travelName: travel.travelName,
          travelImg: travel.travelImg,
          travelStartDt: travel.travelStartDt,
          travelEndDt: travel.travelEndDt,
          productName: item.label,
          productPrice: item.price,
          travelPrice: travel.travelPrice,
          basketTravelAmount: peopleCount,
          basketProductAmount: item.count,
        })),
      },
    });
  };

  return (
    <div className={styles.rightSection}>
      <p className={styles.title}>{travel.travelName}</p>

      <div className={styles.infoBadge}>
        {travel.travelLabel &&
          travel.travelLabel.split(",").map((label, idx) => (
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
                예약 인원 {travel.reservedCount ?? 0}명
              </span>
              <span className={styles.personCount}>
                (잔여 개수{" "}
                {(travel.maxPeople ?? 0) - (travel.reservedCount ?? 0)}개)
              </span>
            </div>
            <p className={styles.minPeopleCount}>
              최소 출발 인원 : {travel.minPeople ?? 0}명
            </p>
          </div>
        </div>
      </div>

      <div className={styles.subProductInfo}>
        <p className={styles.subProductTitle}>추가 구매 상품</p>
        <select
          className={styles.productSelect}
          onChange={handleSelect}
          defaultValue=""
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

      {selectedProducts.map(item => (
        <div className={styles.productItem} key={item.id}>
          <span className={styles.productLabel}>{item.label}</span>
          <div className={styles.productControl}>
            <CounterBox
              label=""
              count={item.count}
              price={item.price}
              hidePrice={true}
              onDecrease={() => updateProductCount(item.id, -1)}
              onIncrease={() => updateProductCount(item.id, 1)}
            />
            <span className={styles.productPrice}>
              {Number(item.count * item.price || 0).toLocaleString()}원
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
            onIncrease={() => setPeopleCount(prev => prev + 1)}
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
        <button className={styles.cartButton} onClick={handleCartClick}>
          장바구니
        </button>
        <button className={styles.reserveButton} onClick={handleReserveClick}>
          예약하기
        </button>
      </div>
    </div>
  );
};

export default Info;

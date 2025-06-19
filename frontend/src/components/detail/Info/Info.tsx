import styles from "./Info.module.scss";
import { people } from "../../../assets";
import { FaRegStar, FaComments, FaRegCalendarCheck } from "react-icons/fa6";
import { LuHotel, LuTicket } from "react-icons/lu";
import { IoMdBus } from "react-icons/io";
import CounterBox from "../../common/CounterBox/CounterBox";
import { useState } from "react";

const Info = () => {
  const [peopleCount, setPeopleCount] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState<
    { label: string; price: number; count: number }[]
  >([]);

  const productList = [
    { label: "우산 (+1,000원)", price: 1000 },
    { label: "스노클링 세트 (+1,000원)", price: 1000 },
    { label: "샤워기 필터 세트 (+1,000원)", price: 1000 },
    { label: "목베게 (+1,000원)", price: 1000 },
    { label: "여행용 파우치 (+1,000원)", price: 1000 },
  ];

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const label = e.target.value;
    const exists = selectedProducts.find(p => p.label === label);
    if (exists) return;

    const found = productList.find(p => p.label === label);
    if (!found) return;

    setSelectedProducts(prev => [...prev, { ...found, count: 1 }]);
  };

  const updateProductCount = (label: string, delta: number) => {
    setSelectedProducts(prev =>
      prev.map(p =>
        p.label === label ? { ...p, count: Math.max(0, p.count + delta) } : p,
      ),
    );
  };

  const totalCount =
    peopleCount + selectedProducts.reduce((sum, item) => sum + item.count, 0);

  const totalPrice =
    peopleCount * 20000 +
    selectedProducts.reduce((sum, item) => sum + item.count * item.price, 0);

  const removeProduct = (label: string) => {
    setSelectedProducts(prev => prev.filter(p => p.label !== label));
  };

  return (
    <div className={styles.rightSection}>
      <p className={styles.title}>[부산] 회먹고 국밥먹고 시장까지 먹방 투어</p>

      <div className={styles.infoBadge}>
        <span className={styles.badge}># 부산</span>
        <span className={styles.badge}># 우정여행</span>
        <span className={styles.badge}># 먹방투어</span>
      </div>

      <div className={styles.rate}>
        <FaRegStar className={styles.starIcon} />
        <span className={styles.starRating}>4.8</span>
        <FaComments className={styles.commentIcon} />
        <span className={styles.commentCount}>23</span>
      </div>

      <div className={styles.detailInfo}>
        <div className={styles.dateInfo}>
          <FaRegCalendarCheck className={styles.calendarIcon} />
          <span className={styles.date}>2025.06.03 ~ 2025.06.05</span>
        </div>

        <div className={styles.personInfo}>
          <img src={people} alt="People Icon" className={styles.peopleIcon} />
          <div className={styles.personText}>
            <div className={styles.personTop}>
              <span className={styles.personCount}>예약 인원 n명</span>
              <span className={styles.personCount}>(잔여 개수 n개)</span>
            </div>
            <p className={styles.minPeopleCount}>최소 출발 인원 : n명</p>
          </div>
        </div>

        <div className={styles.hotelInfo}>
          <LuHotel className={styles.hotelIcon} />
          <span className={styles.hotelDetails}>부산 광안리 호텔</span>
        </div>

        <div className={styles.adventureInfo}>
          <LuTicket className={styles.ticketIcon} />
          <span className={styles.adventureDetails}>
            크루즈 포함 + 루지 포함
          </span>
        </div>

        <div className={styles.trafficInfo}>
          <IoMdBus className={styles.busIcon} />
          <span className={styles.trafficDetails}>버스 대여 O</span>
        </div>
      </div>

      <div className={styles.subProductInfo}>
        <p className={styles.subProductTitle}>추가 구매 상품</p>
        <select className={styles.productSelect} onChange={handleSelect}>
          <option disabled selected>
            상품을 선택하세요
          </option>
          {productList.map(p => (
            <option key={p.label}>{p.label}</option>
          ))}
        </select>
      </div>

      {selectedProducts.map(item => (
        <div className={styles.productItem} key={item.label}>
          <span className={styles.productLabel}>{item.label}</span>

          <div className={styles.productControl}>
            <CounterBox
              label=""
              count={item.count}
              price={item.price}
              hidePrice={true}
              onDecrease={() => updateProductCount(item.label, -1)}
              onIncrease={() => updateProductCount(item.label, 1)}
            />

            <span className={styles.productPrice}>
              {(item.count * item.price).toLocaleString()}원
            </span>
            <button
              className={styles.removeButton}
              onClick={() => removeProduct(item.label)}
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
            price={20000}
            hidePrice={true}
            onDecrease={() => setPeopleCount(prev => Math.max(1, prev - 1))}
            onIncrease={() => setPeopleCount(prev => prev + 1)}
          />
          <span className={styles.productPrice}>
            {(peopleCount * 20000).toLocaleString()}원
          </span>
        </div>
      </div>

      <div className={styles.totalprice}>
        <p className={styles.totalPriceCnt}>총 수량 {totalCount}개</p>
        <p className={styles.totalPrice}>{totalPrice.toLocaleString()}원</p>
      </div>

      <div className={styles.buttonSection}>
        <button className={styles.cartButton}>장바구니</button>
        <button className={styles.reserveButton}>예약하기</button>
      </div>
    </div>
  );
};

export default Info;

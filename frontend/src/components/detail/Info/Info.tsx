import styles from "./Info.module.scss";
import { people } from "../../../assets";
import { FaStar, FaComments, FaRegCalendarCheck } from "react-icons/fa6";
import { LuHotel, LuTicket } from "react-icons/lu";
import { IoMdBus } from "react-icons/io";
import CounterBox from "../../common/CounterBox/CounterBox";
import { useState, useEffect } from "react";
import { HomeTravelDto } from "../../../types/home/homeTravel";
import { productApi } from "../../../api";
import { Product } from "../../../types/admin/product";
import { transformApiProduct } from "../../../utils/productUtils";

interface InfoProps {
  data: HomeTravelDto;
}

const Info = ({ data }: InfoProps) => {
  const [productList, setProductList] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await productApi.getProductList();
      if (Array.isArray(res.data)) {
        const transformed = res.data.map(transformApiProduct);
        setProductList(transformed);
      }
    };

    fetchProducts();
  }, []);

  const [peopleCount, setPeopleCount] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState<
    { label: string; price: number; count: number }[]
  >([]);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const productId = Number(e.target.value);
    const found = productList.find(p => p.product_id === productId);
    if (!found) return;

    const exists = selectedProducts.find(p => p.label === found.product_name);
    if (exists) return;

    setSelectedProducts(prev => [
      ...prev,
      {
        label: found.product_name,
        price: found.product_price,
        count: 1,
      },
    ]);
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
    peopleCount * data.travelPrice +
    selectedProducts.reduce((sum, item) => sum + item.count * item.price, 0);

  const removeProduct = (label: string) => {
    setSelectedProducts(prev => prev.filter(p => p.label !== label));
  };

  return (
    <div className={styles.rightSection}>
      <p className={styles.title}>{data.travelName}</p>

      <div className={styles.infoBadge}>
        {data.travelLabel.split(",").map((label, idx) => (
          <span key={idx} className={styles.badge}>
            #{label.trim()}
          </span>
        ))}
      </div>

      <div className={styles.rate}>
        <FaStar className={styles.starIcon} />
        <span className={styles.starRating}>{(data.rate ?? 0).toFixed(1)}</span>
        <FaComments className={styles.commentIcon} />
        <span className={styles.commentCount}>{data.reviewCount}</span>
      </div>

      <div className={styles.detailInfo}>
        <div className={styles.dateInfo}>
          <FaRegCalendarCheck className={styles.calendarIcon} />
          <span className={styles.date}>
            {data.travelStartDt} ~ {data.travelEndDt}
          </span>
        </div>

        <div className={styles.personInfo}>
          <img src={people} alt="People Icon" className={styles.peopleIcon} />
          <div className={styles.personText}>
            <div className={styles.personTop}>
              <span className={styles.personCount}>
                예약 인원 {data.reservedCount}명
              </span>
              <span className={styles.personCount}>
                (잔여 개수 {(data.maxPeople ?? 0) - (data.reservedCount ?? 0)}
                개)
              </span>
            </div>
            <p className={styles.minPeopleCount}>
              최소 출발 인원 : {data.minPeople}명
            </p>
          </div>
        </div>

        <div className={styles.hotelInfo}>
          <LuHotel className={styles.hotelIcon} />
          <span className={styles.hotelDetails}>{data.hotelInfo}</span>
        </div>

        <div className={styles.adventureInfo}>
          <LuTicket className={styles.ticketIcon} />
          <span className={styles.adventureDetails}>{data.ticketInfo}</span>
        </div>

        <div className={styles.trafficInfo}>
          <IoMdBus className={styles.busIcon} />
          <span className={styles.trafficDetails}>
            버스 대여 {data.busIncluded ? "O" : "X"}
          </span>
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
            <option key={product.product_id} value={product.product_id}>
              {product.product_name} (+{product.product_price.toLocaleString()}
              원)
            </option>
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
            price={data.travelPrice}
            hidePrice={true}
            onDecrease={() => setPeopleCount(prev => Math.max(1, prev - 1))}
            onIncrease={() => setPeopleCount(prev => prev + 1)}
          />
          <span className={styles.productPrice}>
            {(peopleCount * data.travelPrice).toLocaleString()}원
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

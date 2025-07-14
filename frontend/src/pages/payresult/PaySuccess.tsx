import Header from "../../components/common/Header/Header";
import { home_banner } from "../../assets";
import { FaCheckCircle } from "react-icons/fa";
import styles from "./PayResult.module.scss";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const PaySuccess = () => {
  const location = useLocation();
  const { memberName, items } = location.state as {
    memberName: string;
    items: {
      travelName: string;
      travelStartDt: string;
      travelEndDt: string;
      personCount: number;
      travelPrice: number;
      total: number;
      productDetails: {
        productName: string;
        productCount: number;
        productPrice: number;
        total: number;
      }[];
    }[];
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const totalPrice = items.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className={styles.wrapper}>
      <Header />
      <img src={home_banner} alt="배경 이미지" className={styles.bg} />
      <div className={styles.resultBox}>
        <FaCheckCircle className={styles.successIcon} />
        <p className={styles.username}>
          <span className={styles.name}>{memberName}</span>님의
        </p>

        <p className={styles.resultText}>결제가 완료되었습니다</p>

        <div className={styles.detailBox}>
          {items.map((item, index) => (
            <div key={index} className={styles.itemDetail}>
              <div className={styles.detailRow}>
                <span>여행 정보</span>
                <span>{item.travelName}</span>
              </div>
              <div className={styles.detailRow}>
                <span>여행 일자</span>
                <span>
                  {item.travelStartDt.slice(0, 10)} -{" "}
                  {item.travelEndDt.slice(0, 10)}
                </span>
              </div>
              <div className={styles.detailRow}>
                <span>인원</span>
                <span>{item.personCount}명</span>
              </div>
              {item.productDetails.length > 0 && (
                <div className={styles.detailRow}>
                  <span>추가 구매 상품</span>
                  <span>
                    {(item.productDetails ?? []).length > 0 ? (
                      item.productDetails.map((product, i) => (
                        <div key={i}>
                          {product.productName} {product.productCount}개
                          <br />
                          <small>{product.total.toLocaleString()}원</small>
                        </div>
                      ))
                    ) : (
                      <div>추가 상품 0개</div>
                    )}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className={styles.totalRow}>
          <span>총 결제 내역</span>
          <span className={styles.totalPrice}>
            {totalPrice.toLocaleString()}원
          </span>
        </div>
      </div>
    </div>
  );
};

export default PaySuccess;

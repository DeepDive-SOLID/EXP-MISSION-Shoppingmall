import React, { useState } from "react";
import styles from "./OrderList.module.scss";
import { FiPackage, FiTruck, FiCheckCircle, FiXCircle } from "react-icons/fi";
import Header from "../../../components/common/Header_login/Header";
import Sidebar from "../../../components/common/Sidebar_mypage/Sidebar";
import dayjs from "dayjs";

interface OrderItem {
  orderDate: string;
  travelName: string;
  travelImage: string;
  price: number;
  quantity: number;
  status: "0" | "1" | "2" | "3"; // 0: 주문완료, 1: 주문취소, 2: 배송중, 3: 배송완료
  orderNumber: string;
  travel_start_dt: string;
  travel_end_dt: string;
}

const initialOrders: OrderItem[] = [
  {
    orderNumber: "1",
    orderDate: "2025-06-15",
    travelName: "부산여행",
    travelImage: "/src/assets/images/carrier.jpg",
    price: 450000,
    quantity: 1,
    status: "0",
    travel_start_dt: "2025.06.17",
    travel_end_dt: "2025.06.19",
  },
  {
    orderNumber: "2",
    orderDate: "2025-06-10",
    travelName: "강릉여행",
    travelImage: "/src/assets/images/pilow.jpg",
    price: 330000,
    quantity: 2,
    status: "1",
    travel_start_dt: "2025.06.10",
    travel_end_dt: "2025.06.12",
  },
  {
    orderNumber: "3",
    orderDate: "2025-06-05",
    travelName: "스키여행",
    travelImage: "/src/assets/images/snorkel.jpg",
    price: 250000,
    quantity: 5,
    status: "2",
    travel_start_dt: "2025.06.29",
    travel_end_dt: "2025.06.30",
  },
  {
    orderNumber: "4",
    orderDate: "2025-05-05",
    travelName: "여수여행",
    travelImage: "/src/assets/images/snorkel.jpg",
    price: 380000,
    quantity: 2,
    status: "3",
    travel_start_dt: "2025.05.15",
    travel_end_dt: "2025.05.16",
  },
];

const getStatusText = (status: string) => {
  switch (status) {
    case "0":
      return "주문완료";
    case "1":
      return "주문취소";
    case "2":
      return "배송중";
    case "3":
      return "배송완료";
    default:
      return status;
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "0":
      return <FiPackage />;
    case "1":
      return <FiXCircle />;
    case "2":
      return <FiTruck />;
    case "3":
      return <FiCheckCircle />;
    default:
      return <FiPackage />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "0":
      return "#3b82f6"; // 파랑(주문완료)
    case "1":
      return "#ef4444"; // 빨강(주문취소)
    case "2":
      return "#f59e0b"; // 주황(배송중)
    case "3":
      return "#10b981"; // 초록(배송완료)
    default:
      return "#6b7280";
  }
};

const OrderList = () => {
  const userName = "사용자";
  const [orders, setOrders] = useState(initialOrders);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewData, setReviewData] = useState({
    rating: 5,
    title: "",
    content: "",
    images: [] as string[],
  });

  const today = dayjs().startOf("day");
  const upcoming = orders
    .filter(
      order =>
        dayjs(order.travel_start_dt, "YYYY.MM.DD")
          .startOf("day")
          .diff(today, "day") >= 0,
    )
    .sort((a, b) =>
      dayjs(a.travel_start_dt, "YYYY.MM.DD")
        .startOf("day")
        .diff(dayjs(b.travel_start_dt, "YYYY.MM.DD").startOf("day")),
    )[0];
  const daysLeft = upcoming
    ? dayjs(upcoming.travel_start_dt, "YYYY.MM.DD")
        .startOf("day")
        .diff(today, "day")
    : null;

  let noticeMessage;
  if (upcoming) {
    if (daysLeft === 0) {
      noticeMessage = `${userName}님 <b>오늘</b> 여행이 예정되어 있습니다!`;
    } else {
      noticeMessage = `${userName}님 <b>${daysLeft}일 뒤</b> 여행이 예정되어 있습니다!`;
    }
  } else {
    noticeMessage = "예정된 여행이 없습니다!";
  }

  const handleCancelOrder = (order: OrderItem) => {
    setSelectedOrder(order);
    setShowCancelModal(true);
  };

  const handleReviewOrder = (order: OrderItem) => {
    setSelectedOrder(order);
    setShowReviewModal(true);
  };

  const confirmCancelOrder = () => {
    if (selectedOrder) {
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.orderNumber === selectedOrder.orderNumber
            ? { ...order, status: "1" as const }
            : order,
        ),
      );
      setShowCancelModal(false);
      setSelectedOrder(null);
      // 여기에 실제 API 호출 로직을 추가
      alert("예약이 취소되었습니다.");
    }
  };

  const closeModal = () => {
    setShowCancelModal(false);
    setShowReviewModal(false);
    setSelectedOrder(null);
    setReviewData({
      rating: 5,
      title: "",
      content: "",
      images: [],
    });
  };

  const handleReviewSubmit = () => {
    if (reviewData.content.trim().length < 10) {
      alert("내용을 최소 10자 이상 입력해주세요.");
      return;
    }
    // 여기에 실제 리뷰 제출 API 호출 로직을 추가
    console.log("리뷰 제출:", reviewData);
    alert("리뷰가 성공적으로 등록되었습니다!");
    closeModal();
  };

  const handleRatingChange = (rating: number) => {
    setReviewData(prev => ({ ...prev, rating }));
  };

  const handleInputChange = (field: "title" | "content", value: string) => {
    setReviewData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className={styles.orderListPage}>
      <Header />
      <div className={styles.mainContent}>
        <Sidebar userName={userName} />
        <div className={styles.orderListContainer}>
          <div
            className={styles.noticeBox}
            dangerouslySetInnerHTML={{ __html: noticeMessage }}
          />
          <div className={styles.orderList}>
            {orders.length === 0 ? (
              <div className={styles.emptyState}>
                <FiPackage className={styles.emptyIcon} />
                <p>주문 내역이 없습니다</p>
              </div>
            ) : (
              orders.map(order => (
                <div key={order.orderNumber} className={styles.orderCard}>
                  <div className={styles.orderHeader}>
                    <div className={styles.orderInfo}>
                      <span className={styles.orderNumber}>
                        {order.orderNumber}
                      </span>
                      <span className={styles.orderDate}>
                        {order.orderDate}
                      </span>
                    </div>
                    <div
                      className={styles.statusBadge}
                      style={{ backgroundColor: getStatusColor(order.status) }}
                    >
                      {getStatusIcon(order.status)}
                      <span>{getStatusText(order.status)}</span>
                    </div>
                  </div>

                  <div className={styles.orderContent}>
                    <div className={styles.travelInfo}>
                      <img
                        src={order.travelImage}
                        alt={order.travelName}
                        className={styles.travelImage}
                      />
                      <div className={styles.travelDetails}>
                        <h3 className={styles.travelName}>
                          {order.travelName}
                        </h3>
                        <p className={styles.travelMeta}>
                          인원: {order.quantity}명
                        </p>
                        <p className={styles.travelMeta}>
                          여행기간: {order.travel_start_dt} ~{" "}
                          {order.travel_end_dt}
                        </p>
                      </div>
                    </div>
                    <div className={styles.priceInfo}>
                      <span className={styles.price}>
                        {order.price.toLocaleString()}원
                      </span>
                    </div>
                  </div>

                  {(order.status === "3" || order.status === "0") && (
                    <div className={styles.orderActions}>
                      {order.status === "3" && (
                        <button
                          className={styles.actionButton}
                          onClick={() => handleReviewOrder(order)}
                        >
                          리뷰 작성
                        </button>
                      )}
                      {order.status === "0" && (
                        <button
                          className={styles.actionButton}
                          onClick={() => handleCancelOrder(order)}
                        >
                          예약취소
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      {showCancelModal && (
        <div className={styles.cancelModal}>
          <div className={styles.modalContent}>
            <h2>예약을 취소하시겠습니까?</h2>
            <p>취소된 예약은 복구할 수 없습니다.</p>
            <div className={styles.modalActions}>
              <button onClick={confirmCancelOrder}>예</button>
              <button onClick={closeModal}>아니오</button>
            </div>
          </div>
        </div>
      )}
      {showReviewModal && selectedOrder && (
        <div className={styles.reviewModal}>
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={closeModal}>
              &times;
            </button>
            <div className={styles.travelInfoBox}>
              <img
                src={selectedOrder.travelImage}
                alt={selectedOrder.travelName}
                className={styles.travelThumb}
              />
              <div>
                <div className={styles.travelName}>
                  <b>{selectedOrder.travelName}</b>
                </div>
                <div className={styles.travelPeriod}>
                  ({selectedOrder.travel_start_dt}-{selectedOrder.travel_end_dt}
                  )
                </div>
              </div>
            </div>
            <div className={styles.satisfactionQ}>상품은 만족하셨나요?</div>
            <div className={styles.stars}>
              {[1, 2, 3, 4, 5].map(num => (
                <span
                  key={num}
                  className={
                    reviewData.rating >= num ? styles.starFilled : styles.star
                  }
                  onClick={() => handleRatingChange(num)}
                  role="button"
                  aria-label={`${num}점`}
                >
                  ★
                </span>
              ))}
            </div>
            <div className={styles.reviewQ}>어떤 점이 좋았나요?</div>
            <textarea
              className={styles.reviewTextarea}
              placeholder="최소 10자 이상 입력해주세요."
              value={reviewData.content}
              onChange={e => handleInputChange("content", e.target.value)}
              minLength={10}
            />
            <button
              className={styles.submitButton}
              onClick={handleReviewSubmit}
              disabled={reviewData.content.trim().length < 10}
            >
              리뷰 제출
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderList;

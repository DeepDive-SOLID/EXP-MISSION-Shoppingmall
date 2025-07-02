import React, { useState, useEffect } from "react";
import styles from "./OrderList.module.scss";
import { FiPackage, FiTruck, FiCheckCircle, FiXCircle } from "react-icons/fi";
import Header from "../../../components/common/Header/Header";
import Sidebar from "../../../components/common/Sidebar_mypage/Sidebar";
import dayjs from "dayjs";
import {
  getOrdersList,
  cancelOrder,
  addOrdersReview,
  getOrdersReviewDto,
  updOrdersReviewDto,
} from "../../../api/mypage/orderApi";
import { MypageOrdersListDto } from "../../../types/mypage/order";
import { useAuth } from "../../../contexts/AuthContext";
import { getMemberProfile } from "../../../api/mypage/memberApi";
import { MypageMemberProfileDto } from "../../../types/mypage/member";

// 주문 상태 텍스트 반환
const getStatusText = (status: number) => {
  switch (status) {
    case 0:
      return "주문완료";
    case 1:
      return "주문취소";
    case 2:
      return "배송중";
    case 3:
      return "배송완료";
    default:
      return String(status);
  }
};

// 주문 상태 아이콘 반환
const getStatusIcon = (status: number) => {
  switch (status) {
    case 0:
      return <FiPackage />;
    case 1:
      return <FiXCircle />;
    case 2:
      return <FiTruck />;
    case 3:
      return <FiCheckCircle />;
    default:
      return <FiPackage />;
  }
};

// 주문 상태별 색상 반환
const getStatusColor = (status: number) => {
  switch (status) {
    case 0:
      return "#3b82f6";
    case 1:
      return "#ef4444";
    case 2:
      return "#f59e0b";
    case 3:
      return "#10b981";
    default:
      return "#6b7280";
  }
};

const OrderList = () => {
  // 사용자 정보 및 상태 관리
  const { userInfo } = useAuth();
  const [orders, setOrders] = useState<MypageOrdersListDto[]>([]);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedOrder, setSelectedOrder] =
    useState<MypageOrdersListDto | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  // 리뷰 데이터 및 모드(작성/수정) 상태
  const [reviewData, setReviewData] = useState({
    reviewCode: undefined as number | undefined,
    rating: 5,
    title: "",
    content: "",
    images: [] as string[],
  });
  const [memberProfile, setMemberProfile] =
    useState<MypageMemberProfileDto | null>(null);
  const [isEditReview, setIsEditReview] = useState(false);

  const memberId = userInfo?.memberId;

  // 마이페이지 프로필 정보 불러오기
  useEffect(() => {
    const fetchMemberProfile = async () => {
      if (!memberId) return;

      try {
        const profile = await getMemberProfile(memberId);
        setMemberProfile(profile);
      } catch (error) {
        console.error("사용자 프로필 정보를 가져오는데 실패했습니다:", error);
      }
    };

    fetchMemberProfile();
  }, [memberId]);

  // 주문 내역 불러오기
  useEffect(() => {
    if (memberId) {
      getOrdersList(memberId)
        .then(setOrders)
        .catch(e => {
          console.error("주문 내역을 불러오지 못했습니다.", e);
        });
    }
  }, [memberId]);

  const today = dayjs().startOf("day");
  const upcoming = orders
    .filter(
      order =>
        order.orderStatus !== 1 &&
        dayjs(order.travelStartDt, "YYYY-MM-DD")
          .startOf("day")
          .diff(today, "day") >= 0,
    )
    .sort((a, b) =>
      dayjs(a.travelStartDt, "YYYY-MM-DD")
        .startOf("day")
        .diff(dayjs(b.travelStartDt, "YYYY-MM-DD").startOf("day")),
    )[0];
  const daysLeft = upcoming
    ? dayjs(upcoming.travelStartDt, "YYYY-MM-DD")
        .startOf("day")
        .diff(today, "day")
    : null;

  let noticeMessage;
  if (upcoming) {
    if (daysLeft === 0) {
      noticeMessage = `${memberProfile?.memberName || "사용자"} 님 <b>오늘</b> 여행이 예정되어 있습니다!`;
    } else {
      noticeMessage = `${memberProfile?.memberName || "사용자"} 님 <b>${daysLeft}일 뒤</b> 여행이 예정되어 있습니다!`;
    }
  } else {
    noticeMessage = "예정된 여행이 없습니다!";
  }

  // 예약취소 모달 열기
  const handleCancelOrder = (order: MypageOrdersListDto) => {
    setSelectedOrder(order);
    setShowCancelModal(true);
  };

  // 리뷰 작성/수정 모달 열기 (기존 리뷰가 있으면 데이터 불러옴)
  const handleReviewOrder = async (order: MypageOrdersListDto) => {
    setSelectedOrder(order);
    if (order.reviewCheck && memberId) {
      setIsEditReview(true);
      try {
        const data = await getOrdersReviewDto({
          travelId: order.orderTravelId,
          memberId: memberId,
        });
        setReviewData({
          reviewCode: data.reviewCode,
          rating: data.reviewRate,
          title: "",
          content: data.reviewComment,
          images: [],
        });
      } catch {
        setReviewData({
          reviewCode: undefined,
          rating: 5,
          title: "",
          content: "",
          images: [],
        });
      }
    } else {
      setIsEditReview(false);
      setReviewData({
        reviewCode: undefined,
        rating: 5,
        title: "",
        content: "",
        images: [],
      });
    }
    setShowReviewModal(true);
  };

  // 예약취소 확정
  const confirmCancelOrder = async () => {
    if (selectedOrder) {
      try {
        const result = await cancelOrder(selectedOrder.orderId);
        if (result === "SUCCESS") {
          setOrders(prevOrders =>
            prevOrders.map(order =>
              order.orderId === selectedOrder.orderId
                ? { ...order, orderStatus: 1 }
                : order,
            ),
          );
          alert("예약이 취소되었습니다.");
        } else {
          alert("예약 취소에 실패했습니다.");
        }
      } catch {
        alert("예약 취소 중 오류가 발생했습니다.");
      }
      setShowCancelModal(false);
      setSelectedOrder(null);
    }
  };

  // 모달 닫기 및 상태 초기화
  const closeModal = () => {
    setShowCancelModal(false);
    setShowReviewModal(false);
    setSelectedOrder(null);
    setReviewData({
      reviewCode: undefined,
      rating: 5,
      title: "",
      content: "",
      images: [],
    });
  };

  // 리뷰 작성/수정 제출
  const handleReviewSubmit = async () => {
    if (reviewData.content.trim().length < 10) {
      alert("내용을 최소 10자 이상 입력해주세요.");
      return;
    }
    if (!selectedOrder || !memberId) return;

    try {
      let result;
      if (isEditReview) {
        result = await updOrdersReviewDto({
          reviewCode: reviewData.reviewCode!,
          reviewRate: reviewData.rating,
          reviewComment: reviewData.content,
        });
      } else {
        result = await addOrdersReview({
          travelId: selectedOrder.orderTravelId,
          memberId: memberId,
          reviewRate: reviewData.rating,
          reviewComment: reviewData.content,
        });
      }
      if (result === "SUCCESS") {
        alert(
          isEditReview
            ? "리뷰가 성공적으로 수정되었습니다!"
            : "리뷰가 성공적으로 등록되었습니다!",
        );
        window.location.reload();
      } else {
        alert(
          isEditReview
            ? "리뷰 수정에 실패했습니다."
            : "리뷰 등록에 실패했습니다.",
        );
      }
    } catch {
      alert(
        isEditReview
          ? "리뷰 수정 중 오류가 발생했습니다."
          : "리뷰 등록 중 오류가 발생했습니다.",
      );
    }
  };

  // 별점 변경 핸들러
  const handleRatingChange = (rating: number) => {
    setReviewData(prev => ({ ...prev, rating }));
  };

  // 리뷰 입력값 변경 핸들러
  const handleInputChange = (field: "title" | "content", value: string) => {
    setReviewData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className={styles.orderListPage}>
      <Header />
      <div className={styles.mainContent}>
        <Sidebar />
        <div className={styles.orderListContainer}>
          <div className={styles.orderListForm}>
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
                  <div key={order.orderId} className={styles.orderCard}>
                    <div className={styles.orderHeader}>
                      <div className={styles.orderInfo}>
                        <span className={styles.orderNumber}>
                          {order.orderId}
                        </span>
                        <span className={styles.orderDate}>
                          {order.orderDt}
                        </span>
                      </div>
                      <div
                        className={styles.statusBadge}
                        style={{
                          backgroundColor: getStatusColor(order.orderStatus),
                        }}
                      >
                        {getStatusIcon(order.orderStatus)}
                        <span>{getStatusText(order.orderStatus)}</span>
                      </div>
                    </div>

                    <div className={styles.orderContent}>
                      <div className={styles.travelInfo}>
                        <img
                          src={order.travelImg}
                          alt={order.orderTravelName}
                          className={styles.travelImage}
                        />
                        <div className={styles.travelDetails}>
                          <h3 className={styles.travelName}>
                            {order.orderTravelName}
                          </h3>
                          <p className={styles.travelMeta}>
                            인원: {order.orderTravelAmount}명
                          </p>
                          <p className={styles.travelMeta}>
                            여행기간: {order.travelStartDt} ~{" "}
                            {order.travelEndDt}
                          </p>
                        </div>
                      </div>
                      <div className={styles.priceInfo}>
                        <span className={styles.price}>
                          {order.totalPrice.toLocaleString()}원
                        </span>
                      </div>
                    </div>

                    {((order.orderStatus === 3 &&
                      dayjs(order.travelStartDt, "YYYY-MM-DD")
                        .startOf("day")
                        .diff(today, "day") < 0) ||
                      (order.orderStatus === 0 &&
                        dayjs(order.travelStartDt, "YYYY-MM-DD")
                          .startOf("day")
                          .diff(today, "day") >= 0)) && (
                      <div className={styles.orderActions}>
                        {order.orderStatus === 3 &&
                          dayjs(order.travelStartDt, "YYYY-MM-DD")
                            .startOf("day")
                            .diff(today, "day") < 0 && (
                            <button
                              className={styles.actionButton}
                              onClick={() => handleReviewOrder(order)}
                            >
                              {order.reviewCheck ? "리뷰 수정" : "리뷰 작성"}
                            </button>
                          )}
                        {order.orderStatus === 0 &&
                          dayjs(order.travelStartDt, "YYYY-MM-DD")
                            .startOf("day")
                            .diff(today, "day") >= 0 && (
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
                src={selectedOrder.travelImg}
                alt={selectedOrder.orderTravelName}
                className={styles.travelThumb}
              />
              <div>
                <div className={styles.travelName}>
                  <b>{selectedOrder.orderTravelName}</b>
                </div>
                <div className={styles.travelPeriod}>
                  ({selectedOrder.travelStartDt}-{selectedOrder.travelEndDt})
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
              {isEditReview ? "리뷰 수정" : "리뷰 제출"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderList;

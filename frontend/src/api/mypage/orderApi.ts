import axios from "../axios";
import {
  MypageOrdersListDto,
  MypageOrdersReviewDto,
} from "../../types/mypage/order";

// 주문 내역 리스트 조회
export const getOrdersList = async (
  memberId: string,
): Promise<MypageOrdersListDto[]> => {
  const response = await axios.post("/mypage/orders/getOrdersList", memberId, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
  return response.data;
};

// 주문 취소
export const cancelOrder = async (orderId: number): Promise<string> => {
  const response = await axios.put("/mypage/orders/updOrdersCancel", {
    orderId,
    orderStatus: 1,
  });
  return response.data;
};

// 리뷰 등록
export const addOrdersReview = async (
  review: MypageOrdersReviewDto,
): Promise<string> => {
  const response = await axios.post(
    "/mypage/orders/addOrdersReviewDto",
    review,
  );
  return response.data;
};

// 리뷰 단건 조회 (리뷰 수정 시 기존 데이터 불러오기)
export const getOrdersReviewDto = async (params: {
  travelId: number;
  memberId: string;
}) => {
  const response = await axios.post(
    "/mypage/orders/getOrdersReviewDto",
    params,
  );
  return response.data;
};

// 리뷰 정보 수정
export const updOrdersReviewDto = async (review: {
  reviewCode: number;
  reviewRate: number;
  reviewComment: string;
}) => {
  const response = await axios.put(
    "/mypage/orders/updOrdersReviewDto",
    review,
  );
  return response.data;
};

import axios from "../axios";

export interface MypageOrdersListDto {
  orderId: number;
  orderDt: string;
  orderStatus: number;
  orderTravelId: number;
  orderTravelName: string;
  orderTravelAmount: number;
  travelStartDt: string;
  travelEndDt: string;
  travelImg: string;
  totalPrice: number;
}

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

export interface MypageOrdersUpdDto {
  orderId: number;
  orderStatus: number;
}

export const cancelOrder = async (orderId: number): Promise<string> => {
  const response = await axios.put("/mypage/orders/updOrdersCancel", {
    orderId,
    orderStatus: 1,
  });
  return response.data;
};

export interface MypageOrdersReviewDto {
  travelId: number;
  memberId: string;
  reviewRate: number;
  reviewComment: string;
}

export const addOrdersReview = async (
  review: MypageOrdersReviewDto,
): Promise<string> => {
  const response = await axios.post(
    "/mypage/orders/addOrdersReviewDto",
    review,
  );
  return response.data;
};

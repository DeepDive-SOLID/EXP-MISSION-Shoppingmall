import axios from "../axios";
import {
  MypageOrdersListDto,
  MypageOrdersReviewDto,
} from "../../types/mypage/order";

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

export const cancelOrder = async (orderId: number): Promise<string> => {
  const response = await axios.put("/mypage/orders/updOrdersCancel", {
    orderId,
    orderStatus: 1,
  });
  return response.data;
};

export const addOrdersReview = async (
  review: MypageOrdersReviewDto,
): Promise<string> => {
  const response = await axios.post(
    "/mypage/orders/addOrdersReviewDto",
    review,
  );
  return response.data;
};

import api from "../axios";
import {
  OrderAddDto,
  PaymentCardAddDto,
  PaymentCardDto,
} from "../../types/order/order";

export const addOrder = async (
  data: OrderAddDto,
): Promise<"SUCCESS" | "FAILED"> => {
  try {
    const response = await api.post("/payment/save", data);
    return response.data;
  } catch (error) {
    console.error("주문 저장 실패:", error);
    return "FAILED";
  }
};

export const fetchCardList = async (
  memberId: string,
): Promise<PaymentCardDto[]> => {
  try {
    const response = await api.post("/payment/card-info", memberId, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("카드 목록 조회 실패:", error);
    return [];
  }
};

export const addCard = async (
  data: PaymentCardAddDto,
): Promise<"SUCCESS" | "FAILED"> => {
  try {
    const response = await api.post("/payment/add-card", data);
    return response.data;
  } catch (error) {
    console.error("카드 등록 실패:", error);
    return "FAILED";
  }
};

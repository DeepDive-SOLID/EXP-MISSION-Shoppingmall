import api from "../axios";
import {
  AddCardDto,
  AddCardResponse,
  GetCardImageResponse,
  GetPaymentListResponse,
  DeleteCardResponse,
} from "../../types/mypage/card";

// 카드 추가 API
export const addCard = async (
  paymentDto: AddCardDto,
): Promise<AddCardResponse> => {
  const response = await api.post<AddCardResponse>(
    "/mypage/payment/addPaymentDto",
    paymentDto,
  );
  return response.data;
};

// 카드 이미지 가져오기 API
export const getCardImage = async (
  cardNumber: string,
): Promise<GetCardImageResponse> => {
  const response = await api.post<GetCardImageResponse>(
    "/mypage/payment/getCardImg",
    cardNumber,
    {
      headers: { "Content-Type": "application/json" },
    },
  );
  return response.data;
};

// 카드 리스트 가져오기 API
export const getPaymentList = async (
  memberId: string,
): Promise<GetPaymentListResponse> => {
  const response = await api.post<GetPaymentListResponse>(
    "/mypage/payment/getPaymentList",
    memberId,
    {
      headers: { "Content-Type": "text/plain" },
    },
  );
  return response.data;
};

// 카드 삭제 API
export const deleteCard = async (
  paymentId: number,
): Promise<DeleteCardResponse> => {
  const response = await api.delete<DeleteCardResponse>(
    "/mypage/payment/deletePaymentDto",
    {
      data: paymentId,
      headers: { "Content-Type": "application/json" },
    },
  );
  return response.data;
};

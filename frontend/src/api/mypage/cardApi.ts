import api from "../axios";

// 카드 추가 API
export const addCard = async (paymentDto: {
  memberId: string;
  paymentName: string;
  paymentNum: number;
  paymentEndDt: string;
  paymentOwner: string;
  paymentSecurity: number;
  paymentPw: number;
}) => {
  const response = await api.post("/mypage/payment/addPaymentDto", paymentDto);
  return response.data;
};

// 카드 이미지 가져오기 API
export const getCardImage = async (cardNumber: string) => {
  const response = await api.post("/mypage/payment/getCardImg", cardNumber, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

// 카드 리스트 가져오기 API
export const getPaymentList = async (memberId: string) => {
  const response = await api.post("/mypage/payment/getPaymentList", memberId, {
    headers: { "Content-Type": "text/plain" },
  });
  return response.data;
};

// 카드 삭제 API
export const deleteCard = async (paymentId: number) => {
  const response = await api.delete("/mypage/payment/deletePaymentDto", {
    data: paymentId,
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

// 카드 추가 요청 DTO
export interface AddCardDto {
  memberId: string;
  paymentName: string;
  paymentNum: number;
  paymentEndDt: string;
  paymentOwner: string;
  paymentSecurity: number;
  paymentPw: number;
}

// 카드 이미지 요청 DTO
export interface GetCardImageDto {
  cardNumber: string;
}

// 카드 리스트 요청 DTO
export interface GetPaymentListDto {
  memberId: string;
}

// 카드 삭제 요청 DTO
export interface DeleteCardDto {
  paymentId: number;
}

// 카드 정보 응답 DTO
export interface CardInfo {
  paymentId: number;
  memberId: string;
  paymentName: string;
  paymentNum: number;
  paymentEndDt: string;
  paymentOwner: string;
  paymentSecurity: number;
  paymentPw: number;
  paymentImg: string; // 카드 이미지 URL
}

// API 응답 타입들
export type AddCardResponse = string; // "SUCCESS" or "FAIL"
export type GetCardImageResponse = string; // 카드 이미지 URL
export type GetPaymentListResponse = CardInfo[]; // 카드 리스트
export type DeleteCardResponse = string; // "SUCCESS" or "FAIL"

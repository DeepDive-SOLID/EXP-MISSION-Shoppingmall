export interface OrderAddDto {
  orderAddr: string;
  orderAddrDetail: string;
  orderTravelAmount: number;
  orderProductAmount: number;
  travelId: number;
  productId: number;
  paymentId: number;
  memberId: string;
}

export interface PaymentCardAddDto {
  memberId: string;
  paymentName: string;
  paymentNum: string;
  paymentEndDt: string;
  paymentOwner: string;
  paymentSecurity: string;
  paymentPw: string;
}

export interface PaymentCardDto {
  paymentName: string;
  paymentNum: string;
  paymentEndDt: string;
  paymentOwner: string;
  paymentCardImg: string;
  paymentId: number;
}

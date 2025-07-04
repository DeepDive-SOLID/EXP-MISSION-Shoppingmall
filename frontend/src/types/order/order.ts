export interface OrderAddDto {
  orderAddr: string;
  orderAddrDetail: string;
  orderTravelAmount: number;
  paymentId: number;
  memberId: string;
  travelId: number;
  travelPrice: number;
  products: OrderProductDto[];
}

export interface OrderProductDto {
  productId: number;
  orderProductAmount: number;
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

export interface MemberDto {
  memberId: string;
}

export interface OrderMemberDto {
  memberName: string;
  memberBirth: string;
  memberPhone: string;
  memberEmail: string;
}

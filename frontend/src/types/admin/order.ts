export interface Order {
  orderId: number;
  travelName: string;
  productName: string;
  memberId: string;
  paymentName: string;
  orderTravelAmount: number;
  orderProductAmount: number;
  orderDt: string;
  orderState: number;
}

// 주문 관리 페이지 검색 타입
export type OrderSearchType =
  | "orderId"
  | "orderDate"
  | "orderStatus"
  | "memberId"
  | "product"
  | "payment";

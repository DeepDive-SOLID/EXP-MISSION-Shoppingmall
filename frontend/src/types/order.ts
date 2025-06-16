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

export interface OrderTravel {
  order_id: number;
  payment_id: number;
  member_id: string;
  travel_id: number;
  order_travel_amount: number;
  travel_name?: string;
}

export interface OrderProduct {
  order_id: number;
  payment_id: number;
  member_id: string;
  product_id: number;
  order_product_amount: number;
  product_name?: string;
}

// 주문 관리 페이지 검색 타입
export type OrderSearchType =
  | "orderId"
  | "orderDate"
  | "orderStatus"
  | "memberId"
  | "product"
  | "payment";

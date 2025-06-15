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

export interface OrderSearchDto {
  number: number; // 1: 주문번호, 2: 주문일자, 3: 주문상태, 4: 회원ID, 5: 상품명, 6: 여행ID
  data: string; // 검색어
}

// 주문 관리 페이지 검색 타입
export type OrderSearchType =
  | "orderId"
  | "orderDate"
  | "orderStatus"
  | "memberId"
  | "product"
  | "payment"
  | "quantity"
  | "all";

// 주문 검색 카테고리 상수
export const ORDER_SEARCH_CATEGORIES = {
  ORDER_ID: 1, // 주문 번호
  ORDER_DATE: 2, // 주문 일자
  ORDER_STATE: 3, // 주문 상태
  MEMBER_ID: 4, // 회원 ID
  PRODUCT_NAME: 5, // 물품명
  UNUSED: 6, // 미사용
  TRAVEL_ID: 7, // 여행 상품 ID
} as const;

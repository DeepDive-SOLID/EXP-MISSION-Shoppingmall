import api from "../axios";
import { Order } from "../../types/admin/order";

// 주문 관리 API
export const orderApi = {
  // 전체 주문 목록 조회
  getOrderList: async (): Promise<Order[]> => {
    const response = await api.get<Order[]>("/admin/orders/list");
    return response.data;
  },

  // 주문 검색
  searchOrder: async (searchParams: {
    orderId?: number;
    productName?: string;
    memberId?: string;
    paymentName?: string;
    orderDt?: string;
    orderState?: number;
  }): Promise<Order[]> => {
    const response = await api.post<Order[]>(
      "/admin/orders/search",
      searchParams,
    );
    return response.data;
  },

  // 주문 상태 업데이트
  updateOrderStatus: async (
    orderId: number,
    orderState: number,
  ): Promise<void> => {
    await api.put("/admin/orders/updateOrderState", { orderId, orderState });
  },

  // 주문 상세 정보 조회
  getOrderDetail: async (orderId: number): Promise<Order> => {
    const response = await api.get<Order>(`/admin/order/${orderId}`);
    return response.data;
  },
};

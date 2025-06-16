import axios from "axios";
import { User } from "../types/user";
import { TravelListDto, TravelListAllDto } from "../types/travel";
import { Order, OrderSearchDto, OrderSearchType } from "../types/order";
import { ProductListDto } from "../types/product";

// axios 기본 설정
const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터
api.interceptors.request.use(
  config => {
    console.log("API 요청:", config.method?.toUpperCase(), config.url);
    return config;
  },
  error => {
    console.error("API 요청 에러:", error);
    return Promise.reject(error);
  },
);

// 응답 인터셉터
api.interceptors.response.use(
  response => {
    console.log("API 응답:", response.status, response.config.url);
    return response;
  },
  error => {
    console.error("API 응답 에러:", error);
    return Promise.reject(error);
  },
);

// 사용자 관리 API
export const memberApi = {
  // 전체 사용자 목록 조회
  getMemberList: async (): Promise<User[]> => {
    const response = await api.get<User[]>("/admin/member");
    return response.data;
  },

  // 사용자 검색
  searchMember: async (params?: {
    memberId?: string;
    memberName?: string;
  }): Promise<User[]> => {
    const response = await api.post<User[]>("/admin/member/search", params);
    return response.data;
  },
};

// 여행상품 관리 API
export const travelApi = {
  getTravelList: async (): Promise<TravelListDto[]> => {
    try {
      const response = await api.get<TravelListDto[]>(
        "/admin/travel/getTravelList",
      );
      console.log("API 응답:", response.data); // 디버깅용 로그
      return response.data;
    } catch (error) {
      console.error("API 응답 에러:", error);
      throw error;
    }
  },

  // 여행상품 검색
  searchTravel: async (params: {
    travelId: number | null;
    travelName: string | null;
  }): Promise<TravelListAllDto[]> => {
    try {
      const response = await api.post<TravelListAllDto[]>(
        "/admin/travel/search",
        params,
      );
      return response.data;
    } catch (error) {
      console.error("여행상품 검색 중 오류 발생:", error);
      throw error;
    }
  },

  // 여행상품 전체 조회
  getTravelListAll: async (): Promise<TravelListAllDto[]> => {
    try {
      const response = await api.get<TravelListAllDto[]>(
        "/admin/travel/getTravelListAll",
      );
      return response.data;
    } catch (error) {
      console.error("여행 상품 전체 조회 중 오류 발생:", error);
      throw error;
    }
  },

  // 여행상품 상태 업데이트
  updateTravelStatus: async (
    travelId: number,
    isSold: boolean,
  ): Promise<void> => {
    await api.put(`/admin/travel/updateStatus/${travelId}`, { isSold });
  },

  // 여행상품 수정
  updateTravel: async (
    travelId: number,
    data: {
      travelId: number;
      travelName: string;
      travelPrice: number;
      travelAmount: number;
      travelSold: boolean;
      travelComment: string;
      travelLabel: string;
      travelStartDt: string;
      travelEndDt: string;
      travelUpdateDt: string;
      travelImg: string;
    },
  ): Promise<void> => {
    console.log("여행상품 수정 요청 데이터:", data);
    await api.put("/admin/travel/updateTravel", data);
  },

  // 여행상품 삭제
  deleteTravel: async (travelId: number): Promise<void> => {
    await api.delete("/admin/travel/deleteTravel", {
      headers: {
        "Content-Type": "application/json",
      },
      data: travelId,
    });
  },

  // 여행상품 추가
  createTravel: async (data: {
    travelName: string;
    travelPrice: number;
    travelAmount: number;
    travelSold: boolean;
    travelImg: string;
    travelStartDt: string;
    travelEndDt: string;
    travelComment: string;
    travelLabel: string;
    travelUploadDt: string;
    travelUpdateDt: string;
  }): Promise<TravelListDto> => {
    const response = await api.post<TravelListDto>(
      "/admin/travel/addTravel",
      data,
    );
    return response.data;
  },
};

// 주문 관리 API
export const orderApi = {
  // 전체 주문 목록 조회
  getOrderList: async (): Promise<Order[]> => {
    const response = await api.get<Order[]>("/admin/orders/list");
    return response.data;
  },

  // 주문 검색
  searchOrder: async (
    searchType: OrderSearchType,
    searchData: string,
  ): Promise<Order[]> => {
    const searchDto: OrderSearchDto = {
      number:
        searchType === "orderId"
          ? 1
          : searchType === "orderDate"
            ? 2
            : searchType === "orderStatus"
              ? 3
              : searchType === "memberId"
                ? 4
                : searchType === "product"
                  ? 5
                  : 6,
      data: searchData,
    };
    const response = await api.post<Order[]>("/admin/orders/search", searchDto);
    return response.data;
  },

  // 주문 상태 업데이트
  updateOrderStatus: async (orderId: number, status: number): Promise<void> => {
    await api.put(`/admin/order/status/${orderId}`, { status });
  },

  // 주문 상세 정보 조회
  getOrderDetail: async (orderId: number): Promise<Order> => {
    const response = await api.get<Order>(`/admin/order/${orderId}`);
    return response.data;
  },
};

// 물품 관리 API
export const productApi = {
  // 물품 목록 조회
  getProductList: () =>
    api.get<ProductListDto[]>("/admin/product/getProductList"),

  // 물품 검색
  searchProductList: (searchParams: {
    productId?: string;
    productName?: string;
  }) =>
    api.post<ProductListDto[]>(
      "/admin/product/searchProductList",
      searchParams,
    ),

  // 물품 추가
  addProduct: (productData: {
    productName: string;
    productPrice: number;
    productAmount: number;
    productSold: boolean;
    productImg: string;
    productUploadDt: string;
    productUpdateDt: string;
  }) => api.post<ProductListDto>("/admin/product/addProductDto", productData),

  // 물품 수정
  updateProduct: (productData: {
    productId: number;
    productName: string;
    productPrice: number;
    productAmount: number;
    productSold: boolean;
    productUpdateDt: string;
  }) => api.put<ProductListDto>("/admin/product/updateProductDto", productData),

  // 물품 삭제
  deleteProduct: (productId: number) =>
    api.delete<void>("/admin/product/deleteProductDto", {
      data: productId,
    }),
};

export default api;

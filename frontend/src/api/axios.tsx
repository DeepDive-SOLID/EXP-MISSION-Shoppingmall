import axios from "axios";
import { User } from "../types/user";
import { TravelListDto, TravelListAllDto } from "../types/travel";

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
  getMemberList: async (params?: {
    memberId?: string;
    memberName?: string;
  }): Promise<User[]> => {
    const response = await api.get<User[]>("/admin/member/list", { params });
    return response.data;
  },
};

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

  updateTravelStatus: async (
    travelId: number,
    isSold: boolean,
  ): Promise<void> => {
    await api.put(`/admin/travel/updateStatus/${travelId}`, { isSold });
  },

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

  deleteTravel: async (travelId: number): Promise<void> => {
    await api.delete("/admin/travel/deleteTravel", {
      headers: {
        "Content-Type": "application/json",
      },
      data: travelId,
    });
  },

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

export default api;

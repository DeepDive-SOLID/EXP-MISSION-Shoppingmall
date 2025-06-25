import api from "../axios";
import { TravelListDto, TravelListAllDto } from "../../types/admin/travel";

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
  createTravel: async (formData: FormData): Promise<TravelListDto> => {
    const response = await api.post<TravelListDto>(
      "/admin/travel/addTravel",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },
};

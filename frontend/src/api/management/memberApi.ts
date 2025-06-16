import api from "../axios";
import { User } from "../../types/user";

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

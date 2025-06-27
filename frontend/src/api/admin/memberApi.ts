import api from "../axios";
import { User } from "../../types/admin/user";

// 사용자 관리 API
const memberApi = {
  // 전체 사용자 목록 조회
  getMemberList: async (): Promise<User[]> => {
    const response = await api.get<User[]>("/admin/member");
    return response.data;
  },

  // 사용자 검색
  searchMember: async (searchParams: {
    memberId?: string;
    memberName?: string;
  }): Promise<User[]> => {
    const response = await api.post<User[]>(
      "/admin/member/search",
      searchParams,
    );
    return response.data;
  },

  // 회원 권한 업데이트
  updateMemberRole: async (memberId: string, authId: string): Promise<void> => {
    await api.put("/admin/member/updateAuth", {
      memberId,
      authId,
    });
  },
};
export default memberApi;

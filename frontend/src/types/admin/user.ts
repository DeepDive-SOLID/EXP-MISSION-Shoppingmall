export interface User {
  memberId: string;
  memberName: string;
  memberEmail: string;
  memberPhone: string;
  memberBirth: string;
  authName: string;
}

// 사용자 관리 페이지 검색 타입
export type UserSearchType = "id" | "name" | "all";

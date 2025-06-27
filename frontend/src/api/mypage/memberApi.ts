import axios from "../axios";

export interface MypageMemberProfileDto {
  memberId: string;
  memberName: string;
  memberImg: string;
}

export const getMemberProfile = async (
  memberId: string,
): Promise<MypageMemberProfileDto> => {
  const response = await axios.post("/mypage/member/getProfileDto", memberId, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
  return response.data;
};

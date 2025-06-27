import axios from "../axios";
import { MypageMemberProfileDto } from "../../types/mypage/member";

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

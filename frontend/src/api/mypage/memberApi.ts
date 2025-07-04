import axios from "../axios";
import {
  MypageMemberProfileDto,
  MypageMemberDto,
} from "../../types/mypage/member";

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

export const getMemberDto = async (
  memberId: string,
): Promise<MypageMemberDto> => {
  const response = await axios.post("/mypage/member/getMemberDto", memberId, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
  return response.data;
};

export const updateMemberDto = async (formData: FormData): Promise<string> => {
  const response = await axios.put("/mypage/member/updateMemberDto", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteMemberDto = async (memberId: string): Promise<string> => {
  const response = await axios.delete("/mypage/member/deleteMemberDto", {
    data: memberId,
    headers: {
      "Content-Type": "text/plain",
    },
  });
  return response.data;
};

// 이메일 중복확인 API
export const checkEmail = async (memberEmail: string): Promise<boolean> => {
  const response = await axios.post("/mypage/member/checkEmail", memberEmail, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
  return response.data;
};

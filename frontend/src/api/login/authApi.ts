import api from "../axios";
import {
  SignUpDto,
  SignInDto,
  SignFindIdDto,
  SignCheckIdEmailDto,
  SignUpdPwDto,
  SignInCheckIdDto,
  SignUpCheckEmailDto,
  SignUpResponse,
  SignInResponse,
  FindIdResponse,
  CheckIdEmailResponse,
  UpdPwResponse,
  CheckIdResponse,
  CheckEmailResponse,
} from "../../types/login/auth";

export const authApi = {
  // 회원가입
  signUp: async (signUpDto: SignUpDto): Promise<SignUpResponse> => {
    const response = await api.post<SignUpResponse>(
      "/main/sign/signUp",
      signUpDto,
    );
    return response.data;
  },

  // 로그인
  signIn: async (signInDto: SignInDto): Promise<SignInResponse> => {
    const response = await api.post<SignInResponse>(
      "/main/sign/login",
      signInDto,
    );
    return response.data;
  },

  // 아이디 찾기
  findId: async (signFindIdDto: SignFindIdDto): Promise<FindIdResponse> => {
    const response = await api.post<FindIdResponse>(
      "/main/sign/findId",
      signFindIdDto,
    );
    return response.data;
  },

  // 아이디/이메일 확인 (비밀번호 재설정용 인증)
  checkIdEmail: async (
    signCheckIdEmailDto: SignCheckIdEmailDto,
  ): Promise<CheckIdEmailResponse> => {
    const response = await api.post<CheckIdEmailResponse>(
      "/main/sign/checkIdEmail",
      signCheckIdEmailDto,
    );
    return response.data;
  },

  // 비밀번호 재설정
  updatePassword: async (
    signUpdPwDto: SignUpdPwDto,
  ): Promise<UpdPwResponse> => {
    const response = await api.put<UpdPwResponse>(
      "/main/sign/updPw",
      signUpdPwDto,
    );
    return response.data;
  },

  // 아이디 중복 확인
  checkId: async (
    signInCheckIdDto: SignInCheckIdDto,
  ): Promise<CheckIdResponse> => {
    const response = await api.post<CheckIdResponse>(
      "/main/sign/checkId",
      signInCheckIdDto,
    );
    return response.data;
  },

  // 이메일 중복 확인
  checkEmail: async (
    signUpCheckEmailDto: SignUpCheckEmailDto,
  ): Promise<CheckEmailResponse> => {
    const response = await api.post<CheckEmailResponse>(
      "/main/sign/checkEmail",
      signUpCheckEmailDto,
    );
    return response.data;
  },
};

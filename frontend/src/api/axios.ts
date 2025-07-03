import axios from "axios";
import { isLoggedIn, refreshNewToken } from "../utils/auth";

// axios 기본 설정
const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터
api.interceptors.request.use(
  config => {
    // 모든 API 요청에 토큰 추가 (토큰이 있는 경우)
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터
api.interceptors.response.use(
  response => {
    return response;
  },
  async error => {

    // 서버에서 토큰 만료된 경우
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
      alert("세션이 만료되었습니다. 다시 로그인 해주세요.");
      return;
    }

    // 로그인, 회원가입, 아이디/비밀번호 찾기 요청은 토큰 재발급 로직에서 제외
    const isLoginRequest =
      error.config.url?.includes("/main/sign/login") ||
      error.config.url?.includes("/main/sign/signUp") ||
      error.config.url?.includes("/main/sign/findId") ||
      error.config.url?.includes("/main/sign/checkIdEmail") ||
      error.config.url?.includes("/main/sign/updPw");

    // 프론트에서 토큰 만료라고 판단될 경우
    if (!isLoggedIn() && !error.config._retry && !isLoginRequest) {
      error.config._retry = true;
      const newToken = await refreshNewToken();
      if (newToken) {
        error.config.headers["Authorization"] = `Bearer ${newToken}`;
        return api(error.config);
      } else {
        localStorage.removeItem("token");
        window.location.href = "/login";
        return;
      }
    }
    return Promise.reject(error);
  },
);

export default api;

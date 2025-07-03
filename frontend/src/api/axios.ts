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
    // 로그인, 회원가입 요청은 토큰 재발급 로직에서 제외
    const isLoginRequest =
      error.config.url?.includes("/main/sign/login") ||
      error.config.url?.includes("/main/sign/signUp");

    // 토큰이 존재하는지 여부와 만료시간 체크하고 토큰 재발급을 시도하지 않은 요청인 경우
    if (!isLoggedIn() && !error.config._retry && !isLoginRequest) {
      error.config._retry = true;

      const newToken = await refreshNewToken();
      if (newToken) {
        error.config.headers["Authorization"] = `Bearer ${newToken}`;
        return api(error.config);
      } else {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

export default api;

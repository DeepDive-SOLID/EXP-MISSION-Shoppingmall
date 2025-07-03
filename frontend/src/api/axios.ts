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

    // 프론트에서 토큰 만료라고 판단될 경우
    if (!isLoggedIn() && !error.config._retry) {
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

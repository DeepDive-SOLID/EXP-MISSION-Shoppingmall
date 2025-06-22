import axios from "axios";

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
    console.log("API 요청:", config.method?.toUpperCase(), config.url);
    return config;
  },
  error => {
    console.error("API 요청 에러:", error);
    return Promise.reject(error);
  },
);

// 응답 인터셉터
api.interceptors.response.use(
  response => {
    console.log("API 응답:", response.status, response.config.url);
    return response;
  },
  error => {
    console.error("API 응답 에러:", error);
    return Promise.reject(error);
  },
);

export default api;

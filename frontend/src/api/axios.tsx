import axios from "axios";

// axios 기본 설정
const api = axios.create({
  // baseURL을 제거하고 상대 경로 사용
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터
api.interceptors.request.use(
  config => {
    console.log("API 요청:", config.method?.toUpperCase(), config.url);

    // POST 요청인 경우 CORS 헤더 추가
    if (config.method === "post") {
      config.headers["Access-Control-Allow-Origin"] = "*";
      config.headers["Access-Control-Allow-Methods"] =
        "GET, POST, PUT, DELETE, OPTIONS";
      config.headers["Access-Control-Allow-Headers"] =
        "Content-Type, Authorization";
    }

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
    console.log("API 응답 상태:", response.status);
    console.log("API 응답 데이터:", response.data);
    return response;
  },
  error => {
    console.error("API 응답 에러:", error.response?.status, error.message);
    return Promise.reject(error);
  },
);

export default api;

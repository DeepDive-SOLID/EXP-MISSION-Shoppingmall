import axios from "axios";

// axios 기본 설정
const api = axios.create({
  baseURL: "/api", // 추후 실제 API로 대체 가능
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

import api from "../axios";
import { HomeTravelDto } from "../../types/home/homeTravel";
import { HomeSearchDto } from "../../types/home/homeSearch";

// 인기 여행 상품
export const fetchPopularTravels = async (): Promise<HomeTravelDto[]> => {
  const res = await api.post("/home/search", { sorted: 2 });
  return res.data;
};

// 추천 여행 상품
export const fetchRecommendedTravels = async (): Promise<HomeTravelDto[]> => {
  const res = await api.post("/home/search", { sorted: 3 });
  return res.data;
};

// 조건별 검색
export const searchTravels = async (
  params: HomeSearchDto,
): Promise<HomeTravelDto[]> => {
  const res = await api.post("/home/search", params);
  return res.data;
};

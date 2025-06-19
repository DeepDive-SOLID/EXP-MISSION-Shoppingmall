import api from "axios";
import { HomeTravelDto } from "../../types/home/homeTravel";
import { HomeSearchDto } from "../../types/home/homeSearch";

export const fetchPopularTravels = async (): Promise<HomeTravelDto[]> => {
  const res = await api.post("/api/home/search", { sorted: 2 });
  return res.data;
};

export const fetchRecommendedTravels = async (): Promise<HomeTravelDto[]> => {
  const res = await api.post("/api/home/search", { sorted: 3 });
  return res.data;
};

export const searchTravels = async (
  params: HomeSearchDto,
): Promise<HomeTravelDto[]> => {
  const res = await api.post("/api/home/search", params);
  return res.data;
};

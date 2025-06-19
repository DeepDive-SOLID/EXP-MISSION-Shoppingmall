import api from "axios";
import { HomeTravelDto } from "../../types/home/homeTravel";

export const fetchPopularTravels = async (): Promise<HomeTravelDto[]> => {
  const res = await api.post("/api/home/search", { sorted: 2 });
  return res.data;
};

export const fetchRecommendedTravels = async (): Promise<HomeTravelDto[]> => {
  const res = await api.post("/api/home/search", { sorted: 3 });
  return res.data;
};

import api from "../axios";
import { ReviewDto } from "../../types/home/review";

export const fetchReviews = async (travelId: number): Promise<ReviewDto[]> => {
  const res = await api.get(`/reviews?travelId=${travelId}`);
  return res.data;
};

import api from "../axios";
import { ReviewDto } from "../../types/home/review";

export const fetchReviews = async (travelId: number): Promise<ReviewDto[]> => {
  const res = await api.get(`/home/detail-page`, {
    params: { travelId },
  });
  return res.data.reviews;
};

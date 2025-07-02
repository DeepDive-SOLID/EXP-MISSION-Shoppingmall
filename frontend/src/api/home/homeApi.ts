import api from "../axios";
import { HomeTravelDto } from "../../types/home/homeTravel";
import { HomeSearchDto } from "../../types/home/homeSearch";
import { ReviewDto } from "../../types/home/review";
import { ProductDto } from "../../types/home/homeProduct";

// 인기 여행 상품
export const fetchPopularTravels = async (): Promise<HomeTravelDto[]> => {
  const res = await api.post("/home/search", { sorted: 2 });
  return res.data;
};

// 추천 여행 상품(리뷰순)
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

// 상세 페이지 물품
export const fetchProducts = async (): Promise<ProductDto[]> => {
  const res = await api.get("/home/detail-page-products");
  return res.data;
};

// 상세 페이지 리뷰
export const fetchReviews = async (travelId: number): Promise<ReviewDto[]> => {
  const res = await api.get("/home/detail-page-reviews", {
    params: { travelId },
  });
  return res.data;
};

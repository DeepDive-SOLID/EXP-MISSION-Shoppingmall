import { ProductListDto, Product } from "../types/admin/product";
import { getToday } from "./formatDate";

// API 응답 데이터를 Product 타입으로 변환하는 유틸리티 함수
export const transformApiProduct = (item: ProductListDto): Product => ({
  product_id: item.productId,
  product_name: item.productName,
  product_price: item.productPrice,
  product_amount: item.productAmount,
  product_sold: item.productSold,
  product_upload_dt: getToday(), // 기본값으로 현재 날짜 사용
  product_update_dt: getToday(), // 기본값으로 현재 날짜 사용
  product_img: "", // 기본값으로 빈 문자열 사용
});

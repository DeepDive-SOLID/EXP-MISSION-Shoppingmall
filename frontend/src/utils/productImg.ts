import { carrier, pilow, travelkit, snorkel, umbrella } from "../assets";

// 상품 이미지 타입 정의
export interface ProductImage {
  id: string;
  src: string;
}

// 상품 이미지 목록
export const productImages: ProductImage[] = [
  { id: "carrier", src: carrier },
  { id: "pilow", src: pilow },
  { id: "travelkit", src: travelkit },
  { id: "snorkel", src: snorkel },
  { id: "umbrella", src: umbrella },
];

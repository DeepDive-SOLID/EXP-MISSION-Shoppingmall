//
export interface Product {
  product_id: number;
  product_name: string;
  product_price: number;
  product_amount: number;
  product_sold: boolean;
  product_upload_dt: string;
  product_update_dt: string;
}

export interface ProductListDto {
  productId: number;
  productName: string;
  productPrice: number;
  productAmount: number;
  productSold: boolean;
}

// 물품 관리 페이지 검색 타입
export type ProductSearchType = "name" | "code" | "all";

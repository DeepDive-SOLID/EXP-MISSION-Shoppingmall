export interface Product {
  product_id: number;
  product_name: string;
  product_price: number;
  product_amount: number;
  product_sold: boolean;
  product_upload_dt: string;
  product_update_dt: string;
  product_img?: string | null;
}

export interface ProductListDto {
  productId: number;
  productName: string;
  productPrice: number;
  productAmount: number;
  productSold: boolean;
  productUploadDt: string;
  productUpdateDt: string;
  productImg: string;
}

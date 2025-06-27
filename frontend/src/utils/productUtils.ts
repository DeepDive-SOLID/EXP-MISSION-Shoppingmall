import { Product, ProductListDto } from "../types/home/homeProduct";

// utils/productUtils.ts
export const transformApiProduct = (p: Product): ProductListDto => ({
  productId: p.product_id,
  productName: p.product_name,
  productPrice: p.product_price,
  productAmount: p.product_amount,
  productSold: p.product_sold,
  productUploadDt: p.product_upload_dt,
  productUpdateDt: p.product_update_dt,
  productImg: p.product_img ?? "",
});

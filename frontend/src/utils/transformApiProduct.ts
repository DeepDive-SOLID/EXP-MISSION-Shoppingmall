// utils/productUtils.ts
import { Product, ProductListDto } from "../types/home/homeProduct";

export const transformApiProduct = (apiData: Product): ProductListDto => ({
  productId: apiData.product_id,
  productName: apiData.product_name,
  productPrice: apiData.product_price,
  productAmount: apiData.product_amount,
  productSold: apiData.product_sold,
  productUploadDt: apiData.product_upload_dt,
  productUpdateDt: apiData.product_update_dt,
  productImg: apiData.product_img ?? "",
});

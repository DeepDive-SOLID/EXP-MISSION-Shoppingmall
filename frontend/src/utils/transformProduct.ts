import { ApiProduct } from "../types/product";
import { Product } from "../types/product";

export const transformApiProduct = (item: ApiProduct): Product => ({
  product_id: item.productId,
  product_name: item.productName,
  product_price: item.productPrice,
  product_amount: item.productAmount,
  product_sold: item.productSold,
  product_upload_dt: item.productUploadDt,
  product_update_dt: item.productUpdateDt,
  product_img: item.productImg,
});

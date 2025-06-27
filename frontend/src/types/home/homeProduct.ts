export interface Product {
  productId: number;
  productName: string;
  productPrice: number;
  productAmount: number;
  productSold: boolean;
  productUploadDt: string;
  productUpdateDt: string;
  productImg?: string | null;
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

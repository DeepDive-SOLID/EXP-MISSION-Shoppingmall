import api from "../axios";
import { ProductListDto } from "../../types/admin/product";

// 물품 관리 API
export const productApi = {
  // 물품 목록 조회
  getProductList: () =>
    api.get<ProductListDto[]>("/admin/product/getProductList"),

  // 물품 검색
  searchProductList: (searchParams: {
    productId?: string;
    productName?: string;
  }) =>
    api.post<ProductListDto[]>(
      "/admin/product/searchProductList",
      searchParams,
    ),

  // 물품 추가
  addProduct: async (formData: FormData): Promise<ProductListDto> => {
    const response = await api.post<ProductListDto>(
      "/admin/product/addProductDto",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },

  // 물품 수정
  updateProduct: (productData: {
    productId: number;
    productName: string;
    productPrice: number;
    productAmount: number;
    productSold: boolean;
    productUpdateDt: string;
  }) => api.put<ProductListDto>("/admin/product/updateProductDto", productData),

  // 물품 삭제
  deleteProduct: (productId: number) =>
    api.delete<void>("/admin/product/deleteProductDto", {
      data: productId,
    }),
};

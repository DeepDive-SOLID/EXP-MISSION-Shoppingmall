package solid.backend.admin.product.service;

import solid.backend.admin.product.dto.ProductAddDto;
import solid.backend.admin.product.dto.ProductListDto;
import solid.backend.admin.product.dto.ProductSearchDto;
import solid.backend.admin.product.dto.ProductUpdDto;

import java.util.List;

public interface ProductService {

    /**
     * 설명 : 물품 리스트 정보 가져오기
     * @return List<ProductListDto>
     */
    List<ProductListDto> getProductList();

    /**
     * 설명 : 물품 정보 추가
     * @param productDto
     */
    void addProductDto(ProductAddDto productDto);

    /**
     * 설명 : 물품 정보 수정
     * @param productDto
     */
    void updateProductDto(ProductUpdDto productDto);

    /**
     * 설명 : 물품 정보 삭제
     * @param productId
     */
    void deleteProductDto(int productId);

    /**
     * 설명 : 물품 정보 검색
     * @param productDto
     * @return List<ProductListDto>
     */
    List<ProductListDto> searchProductList(ProductSearchDto productDto);
}

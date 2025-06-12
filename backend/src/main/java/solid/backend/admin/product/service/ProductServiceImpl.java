package solid.backend.admin.product.service;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import solid.backend.admin.product.dto.ProductAddDto;
import solid.backend.admin.product.dto.ProductListDto;
import solid.backend.admin.product.dto.ProductUpdDto;
import solid.backend.admin.product.repository.ProductRepository;
import solid.backend.entity.Product;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    /**
     * 설명 : 물품 리스트 정보 가져오기
     * @return List<ProductListDto>
     */
    @Override
    public List<ProductListDto> getProductList() {
        return productRepository.findAll().stream()
                .map(product -> new ProductListDto(
                        product.getProductId(),
                        product.getProductName(),
                        product.getProductPrice(),
                        product.getProductAmount(),
                        product.getProductSold()))
                .collect(Collectors.toList());
    }

    /**
     * 설명 : 물품 정보 추가
     * @param productDto
     */
    @Override
    @Transactional
    public void addProductDto(ProductAddDto productDto) {
        Product product = new Product();
        product.setProductName(productDto.getProductName());
        product.setProductPrice(productDto.getProductPrice());
        product.setProductAmount(productDto.getProductAmount());
        product.setProductSold(productDto.getProductSold());
        product.setProductUploadDt(productDto.getProductUploadDt());
        product.setProductUpdateDt(productDto.getProductUpdateDt());
        productRepository.save(product);
    }

    /**
     * 설명 : 물품 정보 수정
     * @param productDto
     */
    @Override
    @Transactional
    public void updateProductDto(ProductUpdDto productDto) {
        Product product = productRepository.findById(productDto.getProductId())
                .orElseThrow(() -> new IllegalArgumentException("해당 여행 상품이 존재하지 않습니다: id = " + productDto.getProductId()));
        product.setProductId(productDto.getProductId());
        product.setProductName(productDto.getProductName());
        product.setProductPrice(productDto.getProductPrice());
        product.setProductAmount(productDto.getProductAmount());
        product.setProductSold(productDto.getProductSold());
        product.setProductUpdateDt(productDto.getProductUpdateDt());
        productRepository.save(product);
    }

    /**
     * 설명 : 물품 정보 삭제
     * @param productId
     */
    @Override
    @Transactional
    public void deleteProductDto(int productId) {
        productRepository.deleteById(productId);
    }
}

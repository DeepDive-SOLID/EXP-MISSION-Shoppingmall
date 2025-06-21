package solid.backend.admin.product.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Repository;
import solid.backend.admin.product.dto.ProductListDto;
import solid.backend.admin.product.dto.ProductSearchDto;
import solid.backend.entity.QProduct;

import java.util.List;

@Repository
public class ProductQueryRepository {

    private final JPAQueryFactory query;

    public ProductQueryRepository(EntityManager em) {
        this.query = new JPAQueryFactory(em);
    }

    /**
     * 설명 : 물품 정보 검색
     * @return List<ProductListDto>
     */
    public List<ProductListDto> searchProductList(ProductSearchDto productDto) {

        QProduct product = QProduct.product;

        return query
                .select(Projections.constructor(ProductListDto.class,
                        product.productId,
                        product.productName,
                        product.productPrice,
                        product.productAmount,
                        product.productSold
                ))
                .from(product)
                .where(
                        eqProductId(productDto.getProductId()),
                        containsProductName(productDto.getProductName()))
                .fetch();
    }

    /**
     * 설명 : 물품 Id 검색
     * @param productId
     * @return BooleanExpression
     */
    private BooleanExpression eqProductId(Integer productId) {
        return (productId != null) ? QProduct.product.productId.eq(productId) : null;
    }

    /**
     * 설명 : 물품명 검색
     * @param productName
     * @return BooleanExpression
     */
    private BooleanExpression containsProductName(String productName) {
        return (productName != null && !productName.isBlank()) ? QProduct.product.productName.contains(productName) : null;
    }
}

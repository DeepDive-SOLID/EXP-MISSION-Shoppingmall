package solid.backend.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QProduct is a Querydsl query type for Product
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QProduct extends EntityPathBase<Product> {

    private static final long serialVersionUID = -51581183L;

    public static final QProduct product = new QProduct("product");

    public final NumberPath<Integer> productAmount = createNumber("productAmount", Integer.class);

    public final NumberPath<Integer> productId = createNumber("productId", Integer.class);

    public final StringPath productImg = createString("productImg");

    public final StringPath productName = createString("productName");

    public final NumberPath<Integer> productPrice = createNumber("productPrice", Integer.class);

    public final BooleanPath productSold = createBoolean("productSold");

    public final DatePath<java.time.LocalDate> productUpdateDt = createDate("productUpdateDt", java.time.LocalDate.class);

    public final DatePath<java.time.LocalDate> productUploadDt = createDate("productUploadDt", java.time.LocalDate.class);

    public QProduct(String variable) {
        super(Product.class, forVariable(variable));
    }

    public QProduct(Path<? extends Product> path) {
        super(path.getType(), path.getMetadata());
    }

    public QProduct(PathMetadata metadata) {
        super(Product.class, metadata);
    }

}


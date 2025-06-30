package solid.backend.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QCompoundKey is a Querydsl query type for CompoundKey
 */
@Generated("com.querydsl.codegen.DefaultEmbeddableSerializer")
public class QCompoundKey extends BeanPath<CompoundKey> {

    private static final long serialVersionUID = -106741306L;

    public static final QCompoundKey compoundKey = new QCompoundKey("compoundKey");

    public final StringPath memberId = createString("memberId");

    public final NumberPath<Integer> orderId = createNumber("orderId", Integer.class);

    public final NumberPath<Integer> paymentId = createNumber("paymentId", Integer.class);

    public QCompoundKey(String variable) {
        super(CompoundKey.class, forVariable(variable));
    }

    public QCompoundKey(Path<? extends CompoundKey> path) {
        super(path.getType(), path.getMetadata());
    }

    public QCompoundKey(PathMetadata metadata) {
        super(CompoundKey.class, metadata);
    }

}


package solid.backend.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QOrderTravel is a Querydsl query type for OrderTravel
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QOrderTravel extends EntityPathBase<OrderTravel> {

    private static final long serialVersionUID = -1967290086L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QOrderTravel orderTravel = new QOrderTravel("orderTravel");

    public final QCompoundKey id;

    public final QMember member;

    public final QOrders order;

    public final NumberPath<Integer> orderTravelAmount = createNumber("orderTravelAmount", Integer.class);

    public final QPayment payment;

    public final QTravel travel;

    public QOrderTravel(String variable) {
        this(OrderTravel.class, forVariable(variable), INITS);
    }

    public QOrderTravel(Path<? extends OrderTravel> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QOrderTravel(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QOrderTravel(PathMetadata metadata, PathInits inits) {
        this(OrderTravel.class, metadata, inits);
    }

    public QOrderTravel(Class<? extends OrderTravel> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.id = inits.isInitialized("id") ? new QCompoundKey(forProperty("id")) : null;
        this.member = inits.isInitialized("member") ? new QMember(forProperty("member"), inits.get("member")) : null;
        this.order = inits.isInitialized("order") ? new QOrders(forProperty("order"), inits.get("order")) : null;
        this.payment = inits.isInitialized("payment") ? new QPayment(forProperty("payment"), inits.get("payment")) : null;
        this.travel = inits.isInitialized("travel") ? new QTravel(forProperty("travel")) : null;
    }

}


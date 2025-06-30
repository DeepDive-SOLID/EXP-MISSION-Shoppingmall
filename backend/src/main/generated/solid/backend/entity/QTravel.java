package solid.backend.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QTravel is a Querydsl query type for Travel
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QTravel extends EntityPathBase<Travel> {

    private static final long serialVersionUID = -26094904L;

    public static final QTravel travel = new QTravel("travel");

    public final NumberPath<Integer> travelAmount = createNumber("travelAmount", Integer.class);

    public final StringPath travelComment = createString("travelComment");

    public final DatePath<java.time.LocalDate> travelEndDt = createDate("travelEndDt", java.time.LocalDate.class);

    public final NumberPath<Integer> travelId = createNumber("travelId", Integer.class);

    public final StringPath travelImg = createString("travelImg");

    public final StringPath travelLabel = createString("travelLabel");

    public final StringPath travelName = createString("travelName");

    public final NumberPath<Integer> travelPrice = createNumber("travelPrice", Integer.class);

    public final BooleanPath travelSold = createBoolean("travelSold");

    public final DatePath<java.time.LocalDate> travelStartDt = createDate("travelStartDt", java.time.LocalDate.class);

    public final DatePath<java.time.LocalDate> travelUpdateDt = createDate("travelUpdateDt", java.time.LocalDate.class);

    public final DatePath<java.time.LocalDate> travelUploadDt = createDate("travelUploadDt", java.time.LocalDate.class);

    public QTravel(String variable) {
        super(Travel.class, forVariable(variable));
    }

    public QTravel(Path<? extends Travel> path) {
        super(path.getType(), path.getMetadata());
    }

    public QTravel(PathMetadata metadata) {
        super(Travel.class, metadata);
    }

}


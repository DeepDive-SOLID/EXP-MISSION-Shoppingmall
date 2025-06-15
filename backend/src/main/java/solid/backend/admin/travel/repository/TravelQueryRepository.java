package solid.backend.admin.travel.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;
import solid.backend.admin.travel.dto.TravelListDto;
import solid.backend.admin.travel.dto.TravelSearchDto;
import solid.backend.entity.QTravel;

import java.util.List;

@Repository
public class TravelQueryRepository {
    private final JPAQueryFactory queryFactory;

    public TravelQueryRepository(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    public List<TravelListDto> findTravel(TravelSearchDto travelSearchDto) {
        QTravel travel = QTravel.travel;

        return queryFactory
                .select(Projections.constructor(TravelListDto.class,
                        travel.travelId,
                        travel.travelName,
                        travel.travelAmount,
                        travel.travelAmount,
                        travel.travelSold
                ))
                .from(travel)
                .where(
                        eqTravelId(travelSearchDto.getTravelId()),
                        containsTravelName(travelSearchDto.getTravelName())
                )
                .fetch();
    }

    private BooleanExpression eqTravelId(Integer travelId) {
        return travelId != null ? QTravel.travel.travelId.eq(travelId) : null;
    }

    private BooleanExpression containsTravelName(String travelName) {
        return StringUtils.hasText(travelName) ? QTravel.travel.travelName.contains(travelName) : null;
    }
}

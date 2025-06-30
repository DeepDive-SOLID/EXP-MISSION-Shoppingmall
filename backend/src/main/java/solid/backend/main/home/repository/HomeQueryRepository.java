package solid.backend.main.home.repository;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import solid.backend.entity.*;
import solid.backend.main.home.dto.HomeProductDto;
import solid.backend.main.home.dto.HomeReviewDto;
import solid.backend.main.home.dto.HomeSearchDto;
import solid.backend.main.home.dto.HomeTravelDto;

import java.time.LocalDate;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class HomeQueryRepository {

    private final JPAQueryFactory queryFactory;

    QTravel travel = QTravel.travel;
    QReview review = QReview.review;
    QProduct product = QProduct.product;
    QOrderTravel orderTravel = QOrderTravel.orderTravel;

    /**
     * @param homeSearchDto
     * @param orderSpecifiers -> 가변인자를 사용한 것으로, 여러 개의 정렬 조건을 동적으로 전달할 수 있다.
     * @return
     */
    private List<HomeTravelDto> searchTravelCommon(HomeSearchDto homeSearchDto, OrderSpecifier<?>... orderSpecifiers) {
        return queryFactory.select(Projections.constructor(HomeTravelDto.class,
                        travel.travelId,
                        travel.travelName,
                        travel.travelStartDt,
                        travel.travelEndDt,
                        travel.travelLabel,
                        travel.travelPrice,
                        travel.travelImg,
                        review.reviewRate.avg().doubleValue(),
                        review.count().intValue(),
                        orderTravel.id.travelId.count().intValue()
                ))
                .from(travel)
                .leftJoin(orderTravel).on(travel.travelId.eq(orderTravel.id.travelId))
                .leftJoin(review).on(travel.travelId.eq(review.travel.travelId))
                .where(
                        containsTravelName(homeSearchDto.getName()),
                        betweenTravelDt(homeSearchDto.getTravelStartDt(), homeSearchDto.getTravelEndDt()),
                        smallerThanTravelAmount(homeSearchDto.getTravelAmount())
                )
                .groupBy(travel.travelId)
                .orderBy(orderSpecifiers)
                .fetch();
    }

    /**
     * 설명: 홈 화면에 나오는 데이터
     * @return List<HomeTravelDto>
     */
    public List<HomeTravelDto> travelList() {
        return queryFactory.select(Projections.constructor(HomeTravelDto.class,
                        travel.travelId,
                        travel.travelName,
                        travel.travelStartDt,
                        travel.travelEndDt,
                        travel.travelLabel,
                        travel.travelPrice,
                        travel.travelImg,
                        review.reviewRate.avg().doubleValue(),
                        review.count().intValue(),
                        orderTravel.id.travelId.count().intValue()
                ))
                .from(travel)
                .leftJoin(orderTravel).on(travel.travelId.eq(orderTravel.id.travelId))
                .leftJoin(review).on(travel.travelId.eq(review.travel.travelId))
                .groupBy(travel.travelId)
                .fetch();
    }

    /**
     * 설명: 해당하는 상품에 대한 리뷰 리스트
     *
     * @param travelId
     * @return List<HomeReviewDto>
     */
    public List<HomeReviewDto> getTravelReviewList(Integer travelId) {
        return queryFactory.select(Projections.constructor(HomeReviewDto.class,
                        review.reviewRate.intValue(),
                        review.reviewComment,
                        review.member.memberName
                ))
                .from(review)
                .where(review.travel.travelId.eq(travelId))
                .fetch();
    }

    public List<HomeProductDto> getTravelProductList() {
        return queryFactory.select(Projections.constructor(HomeProductDto.class,
                product.productId,
                product.productName,
                product.productPrice,
                product.productImg,
                product.productSold
        ))
                .from(product)
                .fetch();
    }

    /**
     * 가변인자에 따른 정렬 조건분기 ( 최신순 )
     *
     * @param homeSearchDto
     * @return
     */
    public List<HomeTravelDto> searchTravelSortedNew(HomeSearchDto homeSearchDto) {
        return searchTravelCommon(homeSearchDto, travel.travelUploadDt.desc(), review.reviewRate.avg().doubleValue().desc());
    }

    /**
     * 가변인자에 따른 정렬 조건분기 ( 인기순 )
     *
     * @param homeSearchDto
     * @return
     */
    public List<HomeTravelDto> searchTravelSortedPopular(HomeSearchDto homeSearchDto) {
        return searchTravelCommon(homeSearchDto, review.reviewRate.avg().doubleValue().desc(), travel.travelUploadDt.desc());
    }

    /**
     * 가변인자에 따른 정렬 조건분기 ( 리뷰순 )
     *
     * @param homeSearchDto
     * @return
     */
    public List<HomeTravelDto> searchTravelSortedReview(HomeSearchDto homeSearchDto) {
        return searchTravelCommon(homeSearchDto, review.count().intValue().desc(), review.reviewRate.avg().doubleValue().desc());
    }

    /**
     * 설명: 여행상품 이름 검색
     *
     * @param travelName
     * @return BooleanExpression
     */
    private BooleanExpression containsTravelName(String travelName) {
        return (travelName != null) ? QTravel.travel.travelName.contains(travelName) : null;
    }

    /**
     * 설명: 여행상품 시작일, 끝일 검색
     *
     * @param travelStartDt
     * @param travelEndDt
     * @return BooleanExpression
     */
    private BooleanExpression betweenTravelDt(LocalDate travelStartDt, LocalDate travelEndDt) {
        return (travelStartDt != null && travelEndDt != null) ? QTravel.travel.travelStartDt.goe(travelStartDt).and(QTravel.travel.travelEndDt.loe(travelEndDt)) : null;
    }

    /**
     * 설명: 여행상품 남은 수량 검색
     *
     * @param travelAmount
     * @return BooleanExpression
     */
    private BooleanExpression smallerThanTravelAmount(Integer travelAmount) {
        return (travelAmount != null) ? QTravel.travel.travelAmount.goe(travelAmount) : null;
    }

}

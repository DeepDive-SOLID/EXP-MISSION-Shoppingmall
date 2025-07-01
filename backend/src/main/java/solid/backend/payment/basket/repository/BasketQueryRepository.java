package solid.backend.payment.basket.repository;

import com.querydsl.core.QueryFactory;
import com.querydsl.core.types.ExpressionUtils;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import solid.backend.entity.QBasket;
import solid.backend.entity.QMember;

import solid.backend.entity.QOrderTravel;
import solid.backend.entity.QTravel;
import solid.backend.main.home.dto.HomeTravelDto;
import solid.backend.payment.basket.dto.BasketAddDto;
import solid.backend.payment.basket.dto.BasketListDto;
import solid.backend.payment.basket.dto.BasketProductDto;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class BasketQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;
    QBasket basket = QBasket.basket;
    QMember member = QMember.member;
    QTravel travel = QTravel.travel;
    QOrderTravel orderTravel = QOrderTravel.orderTravel;

    /**
     * 설명: 장바구니에서 바로 결제하기로 넘어갔을 때 넘겨줄 데이터
     *
     * @param basketId
     * @return
     */
    public BasketListDto getBasketOne(Integer basketId) {
        return jpaQueryFactory
                .select(Projections.constructor(BasketListDto.class,
                        basket.basketId,
                        basket.travel.travelId,
                        basket.product.productId,
                        basket.travel.travelName,
                        basket.travel.travelPrice,
                        basket.travel.travelStartDt,
                        basket.travel.travelEndDt,
                        basket.travel.travelImg,
                        basket.product.productName,
                        basket.product.productPrice,
                        basket.basketTravelAmount,
                        basket.basketProductAmount
                ))
                .from(basket)
                .leftJoin(basket.product)
                .leftJoin(basket.travel)
                .where(basket.basketId.eq(basketId))
                .fetchOne();
    }

    /**
     * 설명: 해당하는 유저의 장바구니 리스트
     *
     * @param memberId
     * @return List<BasketListDto>
     */
    public List<BasketListDto> getListBasket(String memberId) {
        return jpaQueryFactory
                .select(Projections.fields(BasketListDto.class,
                        ExpressionUtils.as(basket.basketId.max(), "basketId"),
                        basket.travel.travelId,
                        basket.travel.travelName,
                        basket.travel.travelPrice,
                        basket.travel.travelStartDt,
                        basket.travel.travelEndDt,
                        basket.travel.travelImg,
                        basket.basketTravelAmount,
                        basket.travel.travelLabel,
                        basket.travel.travelAmount
                ))
                .from(basket)
                .leftJoin(basket.member, member).on(member.memberId.eq(memberId))
                .leftJoin(basket.product)
                .leftJoin(basket.travel)
                .groupBy(basket.travel.travelId)
                .where(member.memberId.eq(memberId))
                .fetch();
    }

    /**
     * 설명: 장바구니에서 product 리스트를 반환, 물품을 2개이상 구매할 수 있기 때문
     *
     * @param memberId
     * @param travelId
     * @return List<BasketProductDto>
     */
    public List<BasketProductDto> getListProduct(String memberId, Integer travelId) {
        return jpaQueryFactory
                .select(Projections.constructor(BasketProductDto.class,
                        basket.product.productId,
                        basket.product.productName,
                        basket.product.productPrice,
                        basket.basketProductAmount
                ))
                .from(basket)
                .leftJoin(basket.member, member).on(member.memberId.eq(memberId))
                .leftJoin(basket.product)
                .leftJoin(basket.travel)
                .where(basket.travel.travelId.eq(travelId))
                .where(member.memberId.eq(memberId))
                .fetch();
    }

    public Integer getOrderTravelAmount(Integer travelId) {
        return jpaQueryFactory.select(
                        orderTravel.orderTravelAmount.sum().intValue()
                )
                .from(travel)
                .leftJoin(orderTravel).on(travel.travelId.eq(travelId))
                .groupBy(travel.travelId)
                .where(travel.travelId.eq(travelId))
                .fetch().getFirst();
    }
}

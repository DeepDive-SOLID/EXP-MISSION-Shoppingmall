package solid.backend.payment.basket.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import solid.backend.entity.QBasket;
import solid.backend.entity.QMember;

import solid.backend.payment.basket.dto.BasketListDto;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class BasketQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;
    QBasket basket = QBasket.basket;
    QMember member = QMember.member;

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
                .where(basket.basketId.eq(basketId))
                .fetchOne();
    }

    /**
     * 설명: 해당하는 유저의 장바구니 리스트
     * @param memberId
     * @return List<BasketListDto>
     */
    public List<BasketListDto> getListBasket(String memberId) {
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
                .leftJoin(basket.member, member)
                .where(member.memberId.eq(memberId))
                .fetch();
    }
}

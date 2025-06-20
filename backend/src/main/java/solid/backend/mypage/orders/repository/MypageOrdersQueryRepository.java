package solid.backend.mypage.orders.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import solid.backend.entity.*;
import solid.backend.mypage.orders.dto.MypageOrdersListDto;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class MypageOrdersQueryRepository {

    private final JPAQueryFactory query;

    /**
     * 설명 : 주문 내역 리스트 조회
     * @param memberId
     * @return List<MypageOrdersListDto>
     */
    public List<MypageOrdersListDto> getOrdersList(String memberId) {
        QOrders orders = QOrders.orders;
        QTravel travel = QTravel.travel;
        QProduct product = QProduct.product;
        QOrderTravel orderTravel = QOrderTravel.orderTravel;
        QOrderProduct orderProduct = QOrderProduct.orderProduct;
        return query
                .select(Projections.constructor(MypageOrdersListDto.class,
                        orders.ordersId,
                        orders.orderDt,
                        orders.orderState,
                        travel.travelId,
                        travel.travelName,
                        orderTravel.orderTravelAmount,
                        travel.travelStartDt,
                        travel.travelEndDt,
                        travel.travelImg,
                        travel.travelPrice.multiply(orderTravel.orderTravelAmount).castToNum(Long.class)
                                .add(
                                        JPAExpressions
                                                .select(orderProduct.orderProductAmount.multiply(product.productPrice).sum())
                                                .from(orderProduct)
                                                .join(product).on(orderProduct.product.productId.eq(product.productId))
                                                .where(orderProduct.order.ordersId.eq(orders.ordersId))
                                )
                ))
                .from(orders)
                .join(orderTravel).on(orders.ordersId.eq(orderTravel.order.ordersId))
                .join(travel).on(orderTravel.travel.travelId.eq(travel.travelId))
                .where(orders.member.memberId.eq(memberId))
                .fetch();
    }

}

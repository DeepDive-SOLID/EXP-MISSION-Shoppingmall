package solid.backend.mypage.orders.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import solid.backend.admin.orders.dto.OrderProductDto;
import solid.backend.admin.orders.dto.OrderTravelDto;
import solid.backend.entity.*;
import solid.backend.mypage.orders.dto.*;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class MypageOrdersQueryRepository {

    private final JPAQueryFactory query;

    /**
     * 설명 : 주문 내역 리스트 조회
     *
     * @param memberId
     * @return List<MypageOrdersListDto>
     */
    public List<MypageOrdersListDto> getOrdersList(String memberId) {
        QOrders orders = QOrders.orders;
        QTravel travel = QTravel.travel;
        QProduct product = QProduct.product;
        QOrderTravel orderTravel = QOrderTravel.orderTravel;
        QOrderProduct orderProduct = QOrderProduct.orderProduct;
        QReview review = QReview.review;

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
                                                .select(
                                                        Expressions.numberTemplate(
                                                                Long.class,
                                                                "COALESCE(SUM({0}), 0)",
                                                                orderProduct.orderProductAmount.multiply(product.productPrice)
                                                        )
                                                )
                                                .from(orderProduct)
                                                .join(product).on(orderProduct.product.productId.eq(product.productId))
                                                .where(orderProduct.order.ordersId.eq(orders.ordersId))
                                ),
                        JPAExpressions.selectOne()
                                .from(review)
                                .where(review.travel.travelId.eq(travel.travelId).and(review.member.memberId.eq(orders.member.memberId)))
                                .exists()
                ))
                .from(orders)
                .join(orderTravel).on(orders.ordersId.eq(orderTravel.order.ordersId))
                .join(travel).on(orderTravel.travel.travelId.eq(travel.travelId))
                .where(orders.member.memberId.eq(memberId))
                .fetch();
    }

    /**
     * 설명 : 리뷰 정보 조회
     * @param reviewIds
     * @return MypageOrdersReviewDto
     */
    public MypageOrdersReviewDto getOrdersReviewDto(MypageOrdersReviewIdDto reviewIds) {
        QReview review = QReview.review;

        return query
                .select(Projections.constructor(MypageOrdersReviewDto.class,
                        review.reviewCode,
                        review.reviewRate,
                        review.reviewComment
                ))
                .from(review)
                .where(review.travel.travelId.eq(reviewIds.getTravelId()).and(review.member.memberId.eq(reviewIds.getMemberId())))
                .fetchOne();
    }

    /**
     * 설명: 해당 주문이 취소되면 주문했던 상품 갯수 리턴
     * @param orderId
     * @return MypageTravelDto
     */
    public MypageTravelDto findOrderTravelById(Integer orderId) {
        QOrders orders = QOrders.orders;
        QOrderTravel orderTravel = QOrderTravel.orderTravel;

        return query.select(Projections.constructor(MypageTravelDto.class,
                        orderTravel.travel.travelId,
                        orderTravel.orderTravelAmount
                ))
                .from(orders)
                .leftJoin(orders.orderTravels, orderTravel)
                .where(orderTravel.order.ordersId.eq(orderId))
                .fetchOne();
    }

    /**
     * 설명: 해당 주문이 취소되면 주문했던 제품 갯수 리턴
     * @param orderId
     * @return List<MypageProductDto>
     */
    public List<MypageProductDto> findOrderProductById(Integer orderId) {
        QOrders orders = QOrders.orders;
        QOrderProduct orderProduct = QOrderProduct.orderProduct;

        return query.select(Projections.constructor(MypageProductDto.class,
                        orderProduct.product.productId,
                        orderProduct.orderProductAmount
                ))
                .from(orders)
                .leftJoin(orders.orderProducts, orderProduct)
                .where(orderProduct.order.ordersId.eq(orderId))
                .fetch();
    }
}

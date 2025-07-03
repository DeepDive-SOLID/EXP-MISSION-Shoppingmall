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

import java.util.*;
import java.util.stream.Collectors;

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

        // 1. 주문 내역 리스트 조회
        List<MypageOrdersTravelListDto> travelOrderList = query
                .select(Projections.constructor(MypageOrdersTravelListDto.class,
                        orders.ordersId,
                        orders.orderDt,
                        orders.orderState,
                        travel.travelId,
                        travel.travelName,
                        orderTravel.orderTravelAmount,
                        travel.travelPrice,
                        travel.travelLabel,
                        travel.travelSold,
                        travel.travelAmount,
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

        if (travelOrderList.isEmpty()) return Collections.emptyList();

        // 2. 주문 ID 추출
        List<Integer> orderIds = travelOrderList.stream()
                .map(MypageOrdersTravelListDto::getOrderId)
                .collect(Collectors.toList());

        // 3. 주문 ID별 상품 리스트 조회
        Map<Integer, List<MypageOrdersProductListDto>> productMap = query
                .select(orderProduct.order.ordersId,
                        product.productName,
                        orderProduct.orderProductAmount)
                .from(orderProduct)
                .join(product).on(orderProduct.product.productId.eq(product.productId))
                .where(orderProduct.order.ordersId.in(orderIds))
                .fetch()
                .stream()
                .collect(Collectors.groupingBy(
                        tuple -> Optional.ofNullable(tuple.get(orderProduct.order.ordersId)).orElse(-1),
                        Collectors.mapping(tuple ->
                                new MypageOrdersProductListDto(
                                        tuple.get(product.productName),
                                        tuple.get(orderProduct.orderProductAmount)
                                ),
                                Collectors.toList())
                ));

        // 4. 최종 변환: MypageOrdersListDto
        return travelOrderList.stream()
                .map(travelDto -> {
                    MypageOrdersListDto dto = new MypageOrdersListDto();
                    dto.setOrderId(travelDto.getOrderId());
                    dto.setOrderDt(travelDto.getOrderDt());
                    dto.setOrderStatus(travelDto.getOrderStatus());
                    dto.setOrderTravelId(travelDto.getOrderTravelId());
                    dto.setOrderTravelName(travelDto.getOrderTravelName());
                    dto.setOrderTravelAmount(travelDto.getOrderTravelAmount());
                    dto.setTravelPrice(travelDto.getTravelPrice());
                    dto.setTravelLabel(travelDto.getTravelLabel());
                    dto.setTravelSold(travelDto.getTravelSold());
                    dto.setTravelAmount(travelDto.getTravelAmount());
                    dto.setTravelStartDt(travelDto.getTravelStartDt());
                    dto.setTravelEndDt(travelDto.getTravelEndDt());
                    dto.setTravelImg(travelDto.getTravelImg());
                    dto.setTotalPrice(travelDto.getTotalPrice());
                    dto.setReviewCheck(travelDto.getReviewCheck());
                    dto.setOrderProducts(productMap.getOrDefault(travelDto.getOrderId(), new ArrayList<>()));
                    return dto;
                })
                .collect(Collectors.toList());
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

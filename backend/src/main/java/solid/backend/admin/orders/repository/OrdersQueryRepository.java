package solid.backend.admin.orders.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import org.springframework.util.StringUtils;
import solid.backend.admin.orders.dto.OrderProductDto;
import solid.backend.admin.orders.dto.OrderTravelDto;
import solid.backend.admin.orders.dto.OrdersManagementDto;
import solid.backend.admin.orders.dto.OrdersSearchDto;
import solid.backend.entity.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Repository
@RequiredArgsConstructor
public class OrdersQueryRepository {

    private final JPAQueryFactory queryFactory;
    /**
     * 설명: entity 에 해당하는 Q클래스 초기화
     */
    QOrders orders = QOrders.orders;
    QOrderProduct orderProduct = QOrderProduct.orderProduct;
    QOrderTravel orderTravel = QOrderTravel.orderTravel;
    QProduct product = QProduct.product;
    QTravel travel = QTravel.travel;

    public List<OrdersManagementDto> findAllOrders() {
        /**
         *  설명: 전체 조회
         * @return List<OrdersManagementDto>
         */
        return queryFactory
                .select(Projections.constructor(OrdersManagementDto.class,
                        orders.ordersId,
                        travel.travelName,
                        product.productName,
                        orders.member.memberId,
                        orders.payment.paymentName.coalesce("N/A"),
                        orderTravel.orderTravelAmount,
                        orderProduct.orderProductAmount.coalesce(0),
                        orders.orderDt,
                        orders.orderState
                ))
                .from(orders)
                .leftJoin(orders.orderTravels, orderTravel)
                .leftJoin(orders.orderProducts, orderProduct)
                .leftJoin(orderTravel.travel, travel)
                .leftJoin(orderProduct.product, product)
                .fetch();
    }

    /**
     * 설명: 검색 기능
     *
     * @return List<OrdersManagementDto>
     */
    public List<OrdersManagementDto> findSearchOrdersList(OrdersSearchDto search) {

        return queryFactory
                .select(Projections.constructor(OrdersManagementDto.class,
                        orders.ordersId,
                        travel.travelName,
                        product.productName,
                        orders.member.memberId,
                        orders.payment.paymentName.coalesce("N/A"),
                        orderTravel.orderTravelAmount,
                        orderProduct.orderProductAmount.coalesce(0),
                        orders.orderDt,
                        orders.orderState
                ))
                .from(orders)
                .leftJoin(orders.orderTravels, orderTravel)
                .leftJoin(orders.orderProducts, orderProduct)
                .leftJoin(orderTravel.travel, travel)
                .leftJoin(orderProduct.product, product)
                .where(
                        eqOrdersId(search.getOrderId()),
                        containsProductName(search.getProductName()),
                        eqMemberId(search.getMemberId()),
                        containsPaymentName(search.getPaymentName()),
                        eqOrderDt(search.getOrderDt()),
                        eqOrderState(search.getOrderState())
                )
                .fetch();
    }

    /**
     * 설명: 해당 주문이 취소되면 주문했던 상품 갯수 리턴
     * @param orderId
     * @return OrderTravelDto
     */
    public OrderTravelDto findOrderTravelById(Integer orderId) {
        return queryFactory.select(Projections.constructor(OrderTravelDto.class,
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
     * @return List<OrderProductDto>
     */
    public List<OrderProductDto> findOrderProductById(Integer orderId) {
        return queryFactory.select(Projections.constructor(OrderProductDto.class,
                        orderProduct.product.productId,
                        orderProduct.orderProductAmount
                ))
                .from(orders)
                .leftJoin(orders.orderProducts, orderProduct)
                .where(orderProduct.order.ordersId.eq(orderId))
                .fetch();
    }

    /**
     * 설명 : 주문 Id 검색
     *
     * @param ordersId
     * @return BooleanExpression
     */
    private BooleanExpression eqOrdersId(Integer ordersId) {
        return (ordersId != null) ? QOrders.orders.ordersId.eq(ordersId) : null;
    }

    /**
     * 설명 : 물품 이름 검색
     *
     * @param productName
     * @return BooleanExpression
     */
    private BooleanExpression containsProductName(String productName) {
        return (productName != null) ? QProduct.product.productName.contains(productName) : null;
    }

    /**
     * 설명 : 유저 아이디 검색
     *
     * @param memberId
     * @return BooleanExpression
     */
    private BooleanExpression eqMemberId(String memberId) {
        return (memberId != null) ? QOrders.orders.member.memberId.eq(memberId) : null;
    }

    /**
     * 설명 : 결제 수단 검색
     *
     * @param paymentName
     * @return BooleanExpression
     */
    private BooleanExpression containsPaymentName(String paymentName) {
        return (paymentName != null) ? QOrders.orders.payment.paymentName.contains(paymentName) : null;
    }

    /**
     * 설명 : 주문 날짜 검색
     *
     * @param orderDt
     * @return BooleanExpression
     */
    private BooleanExpression eqOrderDt(LocalDate orderDt) {
        return (orderDt != null) ? QOrders.orders.orderDt.eq(orderDt) : null;
    }

    /**
     * 설명 : 주문 상태 검색
     *
     * @param orderState
     * @return BooleanExpression
     */
    private BooleanExpression eqOrderState(Integer orderState) {
        return (orderState != null) ? QOrders.orders.orderState.eq(orderState) : null;
    }

}

package solid.backend.admin.orders.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import solid.backend.admin.orders.dto.OrdersManagementDto;
import solid.backend.entity.*;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class OrdersQueryRepository {

    private final JPAQueryFactory queryFactory;
    /**
     *  설명: entity 에 해당하는 Q클래스 초기화
     */
    QOrders orders = QOrders.orders;
    QOrderProduct orderProduct = QOrderProduct.orderProduct;
    QOrderTravel orderTravel = QOrderTravel.orderTravel;
    QProduct product = QProduct.product;
    QTravel travel = QTravel.travel;

    public List<OrdersManagementDto> findAllOrders() {
        /**
         *  설명: QueryDSL을 이용한 쿼리 작성
         *  연관된 엔티티끼리 조인
         * @return List<OrdersManagementDto>
         */
        return queryFactory
                .select(Projections.constructor(OrdersManagementDto.class,
                        orders.ordersId,
                        travel.travelName,
                        product.productName,
                        orders.member.memberId,
                        orders.payment.paymentName,
                        orderTravel.orderTravelAmount,
                        orderProduct.orderProductAmount,
                        orders.orderDt,
                        orders.orderState
                ))
                .from(orders)
                .join(orders.orderTravels, orderTravel)
                .join(orders.orderProducts, orderProduct)
                .join(orderTravel.travel, travel)
                .join(orderProduct.product, product)
                .fetch();
    }

    public List<OrdersManagementDto> findSearchOrdersList(Object request) {
        return List.of();
    }
}

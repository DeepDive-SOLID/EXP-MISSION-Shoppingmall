package solid.backend.admin.orders.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import org.springframework.util.StringUtils;
import solid.backend.admin.orders.dto.OrdersManagementDto;
import solid.backend.entity.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

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
     *  설명: 검색 기능
     * @return List<OrdersManagementDto>
     */
    public List<OrdersManagementDto> findSearchOrdersList(Map<String, String> search) {
        BooleanBuilder builder = addSearchCondition(search);

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
                .where(builder)
                .fetch();
    }

    /**
     *  설명: BooleanBuilder -> queryDSL 에서 제공하는 동적 쿼리를 구현할 때 유용하게 사용할 수 있는 클래스
     *       service에서 가공한 데이터 중 key값 (지정한 조건) 에 해당하는 조건절(where)을 생성 후 리턴
     * @param search
     * @return Booleanbuilder
     */
    private BooleanBuilder addSearchCondition(Map<String, String> search) {
        BooleanBuilder builder = new BooleanBuilder();

        search.forEach((key, value) -> {
            if (StringUtils.hasText(value)) {
                if (key.contains("orderId")) {
                    builder.and(orders.ordersId.eq(Integer.parseInt(value)));
                } else if (key.contains("orderDt")) {
                    builder.and(orders.orderDt.eq(LocalDate.parse(value)));
                } else if (key.contains("orderState")) {
                    builder.and(orders.orderState.eq(Integer.parseInt(value)));
                } else if (key.contains("memberId")) {
                    builder.and(orders.member.memberId.eq(value));
                } else if (key.contains("productName")) {
                    builder.and(product.productName.contains(value));
                } else if (key.contains("travelId")) {
                    builder.and(travel.travelId.eq(Integer.parseInt(value)));
                }
            }
        });
        return builder;
    }
}

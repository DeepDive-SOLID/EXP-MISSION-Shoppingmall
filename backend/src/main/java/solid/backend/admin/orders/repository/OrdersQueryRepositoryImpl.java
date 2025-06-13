package solid.backend.admin.orders.repository;

import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import solid.backend.admin.orders.dto.OrdersManagementDto;
import solid.backend.entity.*;

import java.util.List;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class OrdersQueryRepositoryImpl implements OrdersQueryRepository {

    private final JPAQueryFactory queryFactory;
    /**
     *  설명: entity 에 해당하는 Q클래스 초기화
     */
    QOrders orders = QOrders.orders;
    QOrderProduct orderProduct = QOrderProduct.orderProduct;
    QOrderTravel orderTravel = QOrderTravel.orderTravel;
    QProduct product = QProduct.product;
    QTravel travel = QTravel.travel;

    @Override
    public List<OrdersManagementDto> search() {
        /**
         *  설명: QueryDSL을 이용한 쿼리 작성
         *  연관된 엔티티끼리 조인
         * @return List<Tuple> -> 내가 원하는 DTO 형식으로 변경
         */
        List<Tuple> tuples = queryFactory
                .select(
                        orders.ordersId,
                        travel.travelName,
                        product.productName,
                        orders.member.memberId,
                        orders.payment.paymentName,
                        orderTravel.orderTravelAmount,
                        orderProduct.orderProductAmount,
                        orders.orderDt,
                        orders.orderState)
                .from(orders)
                .join(orders.orderTravels, orderTravel)
                .join(orders.orderProducts, orderProduct)
                .join(orderTravel.travel, travel)
                .join(orderProduct.product, product)
                .fetch();

        /**
         * 설명: QueryDSL에서 조인을 하면 리턴값이 Tuple로 나옴
         *      내가 원하는 데이터 형식 DTO로 데이터 변환 시켜 리턴
         */
        return tuples.stream().map(t -> new OrdersManagementDto(
                t.get(orders.ordersId),
                t.get(travel.travelName),
                t.get(product.productName),
                t.get(orders.member.memberId),
                t.get(orders.payment.paymentName),
                t.get(orderTravel.orderTravelAmount),
                t.get(orderProduct.orderProductAmount),
                t.get(orders.orderDt),
                t.get(orders.orderState)
        )).collect(Collectors.toList());
    }
}

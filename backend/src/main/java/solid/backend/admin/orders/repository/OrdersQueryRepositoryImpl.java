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
    QOrders orders = QOrders.orders;
    QOrderProduct orderProduct = QOrderProduct.orderProduct;
    QOrderTravel orderTravel = QOrderTravel.orderTravel;
    QProduct product = QProduct.product;
    QTravel travel = QTravel.travel;

    @Override
    public List<OrdersManagementDto> search() {

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

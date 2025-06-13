package solid.backend.admin.orders.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import solid.backend.admin.orders.dto.OrdersManagementDto;
import solid.backend.entity.Orders;

import java.util.List;

public interface OrdersRepository extends JpaRepository<Orders, Integer> {

    @Query("select new solid.backend.admin.orders.dto.OrdersManagementDto(o.ordersId,ott.travelName, opp.productName, o.member.memberId, o.payment.paymentName, ot.orderTravelAmount, op.orderProductAmount, o.orderDt, o.orderState) " +
            "from Orders o join o.orderProducts op join o.orderTravels ot join op.product opp join ot.travel ott ")
    List<OrdersManagementDto> findAllOrders();
}

package solid.backend.admin.orders.service;

import solid.backend.admin.orders.dto.OrdersManagementDto;

import java.util.List;

public interface OrdersService {

    /**
     * 설명 : 주문 관리 조회
     * @return List<OrdersManagementDto>
     */
    List<OrdersManagementDto> findAllOrders();

}

package solid.backend.admin.orders.service;

import solid.backend.admin.orders.dto.OrdersManagementDto;

import java.util.List;

public interface OrdersService {
    List<OrdersManagementDto> findAllOrders();
}

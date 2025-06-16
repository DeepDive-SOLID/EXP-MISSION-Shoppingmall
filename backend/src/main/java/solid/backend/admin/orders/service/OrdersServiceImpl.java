package solid.backend.admin.orders.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import solid.backend.admin.orders.dto.OrdersManagementDto;
import solid.backend.admin.orders.dto.OrdersSearchDto;
import solid.backend.admin.orders.repository.OrdersQueryRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class OrdersServiceImpl implements OrdersService {

    private final OrdersQueryRepository ordersQueryRepository;

    /**
     * 설명 : 주문 관리 조회
     * @return List<OrdersManagementDto>
     */
    @Override
    public List<OrdersManagementDto> findAllOrdersList() {
        return ordersQueryRepository.findAllOrders();
    }

    /**
     * 설명: 주문 관리 검색
     * @param request
     * @return List<OrdersManagementDto>
     */
    @Override
    public List<OrdersManagementDto> findSearchOrdersList(OrdersSearchDto request) {
        return ordersQueryRepository.findSearchOrdersList(request);
    }

}

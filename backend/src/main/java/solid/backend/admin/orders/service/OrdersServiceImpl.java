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
     * 설명: request를 받아 number에 따른 데이터를 가공
     * @param request
     * @return List<OrdersManagementDto>
     */
    @Override
    public List<OrdersManagementDto> findSearchOrdersList(OrdersSearchDto request) {
        Map<String, String> map = new HashMap<>();

        String result = switch (request.getNumber()) {
            case 1 -> "orderId";
            case 2 -> "orderDt";
            case 3 -> "orderState";
            case 4 -> "memberId";
            case 5 -> "productName";
            case 6 -> "";
            default -> "travelId";
        };
        map.put(result, request.getData());

        return ordersQueryRepository.findSearchOrdersList(map);
    }

}

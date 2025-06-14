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
        switch (request.getNumber()) {
            case 1:
                map.put("orderId", request.getData());
                break;
            case 2:
                map.put("orderDt", request.getData());
                break;
            case 3:
                map.put("orderState", request.getData());
                break;
            case 4:
                map.put("memberId", request.getData());
                break;
            case 5:
                map.put("productName", request.getData());
                break;
            case 6:
                // 수량이 필요할까??, 어떤 수량 ..? 흠 ...
                map.put("", request.getData());
                break;
            default:
                // 이것도... 여행상품 고유 id 가 아닌 상품 이름이 필요할까 ..?
                map.put("travelId", request.getData());
                break;
        }
        return ordersQueryRepository.findSearchOrdersList(map);
    }

}

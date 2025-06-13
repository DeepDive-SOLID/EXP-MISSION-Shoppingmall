package solid.backend.admin.orders.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import solid.backend.admin.orders.dto.OrdersManagementDto;
import solid.backend.admin.orders.dto.OrdersSearchDto;
import solid.backend.admin.orders.repository.OrdersQueryRepository;

import java.util.List;

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

    @Override
    public List<OrdersManagementDto> findSearchOrdersList(OrdersSearchDto request) {
        switch (request.getNumber()) {
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
            case 4:
                break;
            case 5:
                break;
            case 6:
                break;
            default:
                break;
        }
        return ordersQueryRepository.findSearchOrdersList(request.getData());
    }

}

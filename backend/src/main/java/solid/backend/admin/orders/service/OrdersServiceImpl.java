package solid.backend.admin.orders.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import solid.backend.admin.orders.dto.OrdersManagementDto;
import solid.backend.admin.orders.dto.OrdersSearchDto;
import solid.backend.admin.orders.dto.OrdersUpdateDto;
import solid.backend.admin.orders.repository.OrdersQueryRepository;
import solid.backend.jpaRepository.OrdersRepository;
import solid.backend.entity.Orders;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrdersServiceImpl implements OrdersService {

    private final OrdersQueryRepository ordersQueryRepository;
    private final OrdersRepository ordersRepository;

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

    /**
     * 설명: 주문 관리 상태 수정
     * @param ordersUpdateDto
     */
    @Override
    public void updateOrderState(OrdersUpdateDto ordersUpdateDto) {
        Orders orders = ordersRepository.findById(ordersUpdateDto.getOrderId())
                .orElseThrow(() -> new IllegalArgumentException("해당 주문 번호가 존재하지 않습니다."));

        orders.setOrderState(ordersUpdateDto.getOrderState());
        ordersRepository.save(orders);
    }
}

package solid.backend.admin.orders.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import solid.backend.admin.orders.dto.*;
import solid.backend.admin.orders.repository.OrdersQueryRepository;
import solid.backend.entity.OrderTravel;
import solid.backend.entity.Product;
import solid.backend.entity.Travel;
import solid.backend.jpaRepository.OrderTravelRepository;
import solid.backend.jpaRepository.OrdersRepository;
import solid.backend.entity.Orders;
import solid.backend.jpaRepository.ProductRepository;
import solid.backend.jpaRepository.TravelRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrdersServiceImpl implements OrdersService {

    private final OrdersQueryRepository ordersQueryRepository;
    private final OrdersRepository ordersRepository;
    private final TravelRepository travelRepository;
    private final ProductRepository productRepository;

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
    @Transactional
    @Override
    public void updateOrderState(OrdersUpdateDto ordersUpdateDto) {
        Orders orders = ordersRepository.findById(ordersUpdateDto.getOrderId())
                .orElseThrow(() -> new IllegalArgumentException("해당 주문 번호가 존재하지 않습니다."));

        orders.setOrderState(ordersUpdateDto.getOrderState());
        if (ordersUpdateDto.getOrderState() == 1) {
            OrderTravelUpdate(ordersUpdateDto.getOrderId());
            OrderProductUpdate(ordersUpdateDto.getOrderId());
        }
        ordersRepository.save(orders);
    }

    /**
     * 설명: 관리자가 주문 취소 했을 시 travel 갯수 수정
     * @param orderId
     */
    private void OrderTravelUpdate(Integer orderId) {
        OrderTravelDto orderTravelDto = ordersQueryRepository.findOrderTravelById(orderId);
        Travel travel = travelRepository.findById(orderTravelDto.getTravelId()).orElseThrow(() -> new IllegalArgumentException("해당하는 상품이 없습니다."));

        int result = travel.getTravelAmount() + orderTravelDto.getOrderTravelAmount();
        travel.setTravelAmount(result);

        travelRepository.save(travel);
    }

    /**
     * 설명: 관리자가 주문 취소 했을 시 product 갯수 수정
     * @param orderId
     */
    private void OrderProductUpdate(Integer orderId) {
        List<OrderProductDto> orderProductDto = ordersQueryRepository.findOrderProductById(orderId);

        orderProductDto.forEach(items -> {
            Product product = productRepository.findById(items.getProductId()).orElseThrow(() -> new IllegalArgumentException("해당하는 물품이 없습니다."));

            int result = product.getProductAmount() + items.getOrderProductAmount();
            product.setProductAmount(result);
            productRepository.save(product);
        });
    }
}

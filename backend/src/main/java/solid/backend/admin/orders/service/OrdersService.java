package solid.backend.admin.orders.service;

import com.querydsl.core.Tuple;
import solid.backend.admin.orders.dto.OrdersManagementDto;
import solid.backend.admin.orders.dto.OrdersSearchDto;

import java.util.List;

public interface OrdersService {

    /**
     * 설명 : 주문 관리 조회
     * @return List<OrdersManagementDto>
     */
    List<OrdersManagementDto> findAllOrdersList();

    /**
     * 설명: 주문 관리 검색
     * @param request
     * @return List<OrdersManagementDto>
     */
    List<OrdersManagementDto> findSearchOrdersList(OrdersSearchDto request);
}

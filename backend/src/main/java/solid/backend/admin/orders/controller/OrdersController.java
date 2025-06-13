package solid.backend.admin.orders.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import solid.backend.admin.orders.dto.OrdersManagementDto;
import solid.backend.admin.orders.service.OrdersService;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/admin/orders")
@CrossOrigin()
public class OrdersController {

    private final OrdersService ordersService;

    /**
     *  설명 : 주문 관리 조회
     *  @return List<OrderManagementDto>
     */
    @ResponseBody
    @GetMapping("/ordersList")
    public List<OrdersManagementDto> findAllOrders() {
        return ordersService.findAllOrders();
    }
}

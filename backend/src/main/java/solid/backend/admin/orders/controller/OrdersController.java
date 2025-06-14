package solid.backend.admin.orders.controller;

import com.querydsl.core.Tuple;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import solid.backend.admin.orders.dto.OrdersManagementDto;
import solid.backend.admin.orders.dto.OrdersSearchDto;
import solid.backend.admin.orders.service.OrdersService;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/admin/orders")
@CrossOrigin(origins = "http://localhost:5173", methods = {RequestMethod.GET, RequestMethod.POST})
public class OrdersController {

    private final OrdersService ordersService;

    /**
     *  설명: 주문 관리 조회
     *  @return List<OrdersManagementDto>
     */
    @ResponseBody
    @GetMapping("/list")
    public List<OrdersManagementDto> findAllOrders() {
        return ordersService.findAllOrdersList();
    }

    /**
     * 설명: 주문 관리 검색
     * @param @RequestBody OrderSearchDto
     * @return List<OrdersManagementDto>
     */
    @ResponseBody
    @GetMapping("/search")
    public List<OrdersManagementDto> findAllOrdersSearch(@RequestBody OrdersSearchDto request) {
        return ordersService.findSearchOrdersList(request);
    }


}

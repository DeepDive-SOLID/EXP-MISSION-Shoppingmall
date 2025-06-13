package solid.backend.admin.orders.repository;

import com.querydsl.core.Tuple;
import solid.backend.admin.orders.dto.OrdersManagementDto;

import java.util.List;

public interface OrdersQueryRepository {
    List<OrdersManagementDto> search();
}

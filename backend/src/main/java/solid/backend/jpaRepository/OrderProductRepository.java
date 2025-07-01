package solid.backend.jpaRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import solid.backend.entity.OrderProduct;
import solid.backend.entity.OrderProductId;

public interface OrderProductRepository extends JpaRepository<OrderProduct, OrderProductId> {
}

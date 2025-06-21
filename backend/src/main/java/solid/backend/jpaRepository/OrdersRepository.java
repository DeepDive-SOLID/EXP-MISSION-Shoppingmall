package solid.backend.jpaRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import solid.backend.entity.Orders;

public interface OrdersRepository extends JpaRepository<Orders, Integer> {
}

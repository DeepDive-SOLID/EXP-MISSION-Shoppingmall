package solid.backend.jpaRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import solid.backend.entity.CompoundKey;
import solid.backend.entity.OrderProduct;

public interface OrderProductRepository extends JpaRepository<OrderProduct, CompoundKey> {
}

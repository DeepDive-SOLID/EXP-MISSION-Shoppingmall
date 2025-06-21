package solid.backend.jpaRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import solid.backend.entity.CompoundKey;
import solid.backend.entity.OrderTravel;

public interface OrderTravelRepository extends JpaRepository<OrderTravel, CompoundKey> {
}

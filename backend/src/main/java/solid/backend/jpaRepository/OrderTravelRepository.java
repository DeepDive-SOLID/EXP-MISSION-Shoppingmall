package solid.backend.jpaRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import solid.backend.entity.OrderTravel;
import solid.backend.entity.OrderTravelId;

public interface OrderTravelRepository extends JpaRepository<OrderTravel, OrderTravelId> {
}

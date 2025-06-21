package solid.backend.jpaRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import solid.backend.entity.Travel;

public interface TravelRepository extends JpaRepository<Travel, Integer> {
}

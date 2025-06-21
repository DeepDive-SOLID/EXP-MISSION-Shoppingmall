package solid.backend.admin.travel.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import solid.backend.entity.Travel;

public interface TravelRepository extends JpaRepository<Travel, Integer> {
}

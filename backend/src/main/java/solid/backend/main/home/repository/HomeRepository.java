package solid.backend.main.home.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import solid.backend.entity.Travel;

public interface HomeRepository extends JpaRepository<Travel, Integer> {
}

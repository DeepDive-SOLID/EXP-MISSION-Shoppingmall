package solid.backend.jpaRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import solid.backend.entity.Basket;

public interface BasketRepository extends JpaRepository<Basket, Integer> {
}

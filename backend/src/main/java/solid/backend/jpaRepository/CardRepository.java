package solid.backend.jpaRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import solid.backend.entity.Card;

public interface CardRepository extends JpaRepository<Card, Integer> {
}
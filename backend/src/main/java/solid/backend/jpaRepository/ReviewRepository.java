package solid.backend.jpaRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import solid.backend.entity.Review;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
}

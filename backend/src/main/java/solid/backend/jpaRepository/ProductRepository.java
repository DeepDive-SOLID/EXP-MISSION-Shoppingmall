package solid.backend.jpaRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import solid.backend.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {
}

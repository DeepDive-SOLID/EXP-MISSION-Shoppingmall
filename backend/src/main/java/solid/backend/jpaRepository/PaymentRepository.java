package solid.backend.jpaRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import solid.backend.entity.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {
}

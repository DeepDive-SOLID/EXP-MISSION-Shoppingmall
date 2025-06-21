package solid.backend.jpaRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import solid.backend.entity.Auth;

public interface AuthRepository extends JpaRepository<Auth, String> {
}

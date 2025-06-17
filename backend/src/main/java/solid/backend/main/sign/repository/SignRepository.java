package solid.backend.main.sign.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import solid.backend.entity.Member;

public interface SignRepository extends JpaRepository <Member, String> {
}

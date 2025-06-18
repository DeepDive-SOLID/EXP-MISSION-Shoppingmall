package solid.backend.main.sign.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import solid.backend.entity.Member;

import java.util.Optional;

public interface SignRepository extends JpaRepository <Member, String> {
    Optional<Member> findByMemberEmail(String email);
}

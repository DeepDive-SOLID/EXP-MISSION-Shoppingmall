package solid.backend.jpaRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import solid.backend.entity.Member;

import java.util.Optional;


public interface MemberRepository extends JpaRepository<Member, String> {
    Optional<Member> findByMemberEmail(String email);
}

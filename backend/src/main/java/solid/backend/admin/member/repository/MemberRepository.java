package solid.backend.admin.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import solid.backend.entity.Member;


public interface MemberRepository extends JpaRepository<Member, Integer> {
}

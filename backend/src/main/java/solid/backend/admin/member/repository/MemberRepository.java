package solid.backend.admin.member.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import solid.backend.admin.member.dto.MemberDto;

public interface MemberRepository extends JpaRepository<MemberDto, Long> {
}

package solid.backend.admin.member.repository;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import solid.backend.entity.Member;

import java.util.List;

public interface MemberRepository extends JpaRepository<Member, Integer>, MemberRepositoryCustom {
    @Override
    @EntityGraph(attributePaths = "authList") // authList를 함께 fetch
    List<Member> findAll();
}

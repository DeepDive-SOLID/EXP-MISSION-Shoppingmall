package solid.backend.admin.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import solid.backend.admin.member.dto.AuthDto;

public interface AuthRepository extends JpaRepository <AuthDto, String> {
}

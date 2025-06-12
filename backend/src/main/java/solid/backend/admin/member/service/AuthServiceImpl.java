package solid.backend.admin.member.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import solid.backend.admin.member.dto.AuthDto;
import solid.backend.admin.member.repository.AuthRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService{
    private final AuthRepository authRepository;

    @Override
    public List<AuthDto> getAuthList() {
        return authRepository.findAll();
    }
}

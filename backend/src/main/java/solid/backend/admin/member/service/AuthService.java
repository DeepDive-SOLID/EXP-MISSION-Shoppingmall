package solid.backend.admin.member.service;

import solid.backend.admin.member.dto.AuthDto;

import java.util.List;

public interface AuthService {
    List<AuthDto> getAuthList();
}

package solid.backend.admin.member.service;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import solid.backend.admin.member.dto.MemberDto;
import solid.backend.admin.member.repository.MemberRepository;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;

    @Override
    public List<MemberDto> getMemberList() {
        return memberRepository.findAll();
    }
}

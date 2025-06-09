package solid.backend.admin.member.service;
import solid.backend.admin.member.dto.MemberDto;
import java.util.List;
public interface MemberService {

    List<MemberDto> getMemberList();
}

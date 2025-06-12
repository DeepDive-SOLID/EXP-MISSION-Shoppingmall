package solid.backend.admin.member.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.util.StringUtils;
import solid.backend.admin.member.dto.MemberListDto;
import solid.backend.entity.QAuth;
import solid.backend.entity.QMember;

import java.util.List;

@RequiredArgsConstructor
public class MemberRepositoryImpl implements MemberRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public List<MemberListDto> findBySearchCondition(String memberId, String memberName) {
        QMember member = QMember.member;
        QAuth auth = QAuth.auth;

        return queryFactory
                .select(Projections.constructor(MemberListDto.class,
                        member.memberId,
                        member.memberName,
                        member.memberEmail,
                        member.memberPhone,
                        member.memberBirth,
                        auth.authName // authName이 단일일 경우
                ))
                .from(member)
                .leftJoin(member.authList, auth)
                .where(
                        eqMemberId(memberId),
                        eqMemberName(memberName)
                )
                .fetch();
    }

    private BooleanExpression eqMemberId(String memberId) {
        return StringUtils.hasText(memberId) ? QMember.member.memberId.eq(memberId) : null;
    }

    private BooleanExpression eqMemberName(String memberName) {
        return StringUtils.hasText(memberName) ? QMember.member.memberName.eq(memberName) : null;
    }
}

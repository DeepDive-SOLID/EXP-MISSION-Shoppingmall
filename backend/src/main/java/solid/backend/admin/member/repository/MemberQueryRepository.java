package solid.backend.admin.member.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;
import solid.backend.admin.member.dto.MemberListDto;
import solid.backend.admin.member.dto.MemberSearchDto;
import solid.backend.entity.QAuth;
import solid.backend.entity.QMember;

import java.util.List;

@Repository
public class MemberQueryRepository {
    private final JPAQueryFactory queryFactory;

    public MemberQueryRepository(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    /**
     * 설명: 사용자 관리 검색
     * @param memberSearchDto
     * @return List<MemberListDto>
     */
    public List<MemberListDto> findMember(MemberSearchDto memberSearchDto) {
        QMember member = QMember.member;
        QAuth auth = QAuth.auth;

        return queryFactory
                .select(Projections.constructor(MemberListDto.class,
                        member.memberId,
                        member.memberName,
                        member.memberEmail,
                        member.memberPhone,
                        member.memberBirth,
                        auth.authName
                ))
                .from(member)
                .join(member.authId, auth)
                .where(
                        eqMemberId(memberSearchDto.getMemberId()),
                        containsMemberName(memberSearchDto.getMemberName())
                )
                .fetch();
    }

    /**
     * 설명: 사용자 Id 검색
     * @param memberId
     * @return BooleanExpression
     */
    private BooleanExpression eqMemberId(String memberId) {
        return StringUtils.hasText(memberId) ? QMember.member.memberId.eq(memberId) : null;
    }

    /**
     * 설명: 사용자 Name 검색
     * @param memberName
     * @return BooleanExpression
     */
    private BooleanExpression containsMemberName(String memberName) {
        return StringUtils.hasText(memberName) ? QMember.member.memberName.contains(memberName) : null;
    }
}

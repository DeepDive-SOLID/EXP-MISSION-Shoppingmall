package solid.backend.payment.payment.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import solid.backend.entity.*;
import solid.backend.payment.payment.dto.MemberDto;
import solid.backend.payment.payment.dto.OrderMemberDto;
import solid.backend.payment.payment.dto.PaymentCardDto;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class PaymentQueryRepository {

    private final JPAQueryFactory queryFactory;

    QPayment payment = QPayment.payment;
    QMember member = QMember.member;

    /**
     * 설명: 해당하는 유저의 카드 리스트 정보
     *
     * @param memberDto
     * @return List<PaymentCardDto>
     */
    public List<PaymentCardDto> PaymentCardInfo(MemberDto memberDto) {
        return queryFactory.select(Projections.fields(PaymentCardDto.class,
                        payment.paymentId,
                        payment.paymentName,
                        payment.paymentNum,
                        payment.paymentEndDt,
                        payment.paymentOwner
                )).from(payment)
                .leftJoin(payment.member, member).on(payment.member.memberId.eq(memberDto.getMemberId()))
                .where(payment.member.memberId.eq(memberDto.getMemberId()))
                .fetch();
    }

    /**
     * 설명: 주문 페이지 시 로그인 했으면 유저 정보를 줌
     * @param memberDto
     * @return OrderMemberDto
     */
    public OrderMemberDto getOrderMemberInfo(MemberDto memberDto) {
        return queryFactory.select(Projections.constructor(OrderMemberDto.class,
                        member.memberName,
                        member.memberBirth,
                        member.memberPhone,
                        member.memberEmail
                ))
                .from(member)
                .where(member.memberId.eq(memberDto.getMemberId()))
                .fetchOne();
    }
}

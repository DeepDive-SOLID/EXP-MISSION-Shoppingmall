package solid.backend.payment.payment.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import solid.backend.entity.OrderTravel;
import solid.backend.entity.QMember;
import solid.backend.entity.QOrderTravel;
import solid.backend.entity.QPayment;
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
     * @param memberId
     * @return List<PaymentCardDto>
     */
    public List<PaymentCardDto> PaymentCardInfo(String memberId) {
        return queryFactory.select(Projections.fields(PaymentCardDto.class,
                        payment.paymentId,
                        payment.paymentName,
                        payment.paymentNum,
                        payment.paymentEndDt,
                        payment.paymentOwner
                )).from(payment)
                .leftJoin(payment.member, member).on(payment.member.memberId.eq(memberId))
                .fetch();
    }
}

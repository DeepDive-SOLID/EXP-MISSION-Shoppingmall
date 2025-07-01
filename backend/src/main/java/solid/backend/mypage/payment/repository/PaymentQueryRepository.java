package solid.backend.mypage.payment.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import solid.backend.entity.QMember;
import solid.backend.entity.QPayment;
import solid.backend.mypage.payment.dto.PaymentDto;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class PaymentQueryRepository {

    private final JPAQueryFactory query;

    /**
     * 설명 : 결제 수단 리스트 조회
     * @param memberId
     * @return List<PaymentListDto>
     */
    public List<PaymentDto> getPaymentList(String memberId) {
        QMember member = QMember.member;
        QPayment payment = QPayment.payment;

        return query
                .select(Projections.fields(PaymentDto.class,
                        payment.paymentId,
                        payment.paymentName,
                        payment.paymentNum,
                        payment.paymentEndDt
                ))
                .from(payment)
                .join(payment.member, member)
                .where(member.memberId.eq(memberId))
                .fetch();
    }
}

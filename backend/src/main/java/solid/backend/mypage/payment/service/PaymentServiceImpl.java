package solid.backend.mypage.payment.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import solid.backend.common.AESUtil;
import solid.backend.common.FileManager;
import solid.backend.entity.Card;
import solid.backend.entity.Member;
import solid.backend.entity.Payment;
import solid.backend.jpaRepository.CardRepository;
import solid.backend.jpaRepository.MemberRepository;
import solid.backend.jpaRepository.PaymentRepository;
import solid.backend.mypage.payment.dto.PaymentAddDto;
import solid.backend.mypage.payment.dto.PaymentListDto;
import solid.backend.mypage.payment.repository.PaymentQueryRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final PaymentQueryRepository paymentQueryRepository;
    private final PaymentRepository paymentRepository;
    private final MemberRepository memberRepository;
    private final CardRepository cardRepository;
    private final FileManager fileManager;
    private final AESUtil aesUtil;

    /**
     * 설명 : 결제 수단 리스트 조회
     * @param memberId
     * @return List<PaymentListDto>
     */
    @Override
    public List<PaymentListDto> getPaymentList(String memberId) {
        return paymentQueryRepository.getPaymentList(memberId).stream()
                .map(payment -> {
                    String decryptedNum = aesUtil.decrypt(payment.getPaymentNum());
                    String cardId = decryptedNum.substring(0, 4);
                    String cardImg = fileManager.getFileUrl(
                            cardRepository.findById(Integer.parseInt(cardId))
                                    .orElseThrow(() -> new IllegalArgumentException("해당 카드가 없습니다: id = " + cardId))
                                    .getCardImg()
                    );

                    return new PaymentListDto(
                            payment.getPaymentId(),
                            payment.getPaymentName(),
                            decryptedNum,
                            payment.getPaymentEndDt(),
                            cardImg
                    );
                })
                .collect(Collectors.toList());
    }

    /**
     * 설명 : 카드 이미지 조회
     * @param cardId
     * @return String
     */
    @Override
    public String getCardImg(Integer cardId) {
        Card card = cardRepository.findById(cardId)
                .orElseThrow(() -> new IllegalArgumentException("해당 카드가 없습니다: id = " + cardId));
        return fileManager.getFileUrl(card.getCardImg());
    }

    /**
     * 설명 : 결제 수단 추가
     * @param paymentDto
     */
    @Override
    @Transactional
    public void addPaymentDto(PaymentAddDto paymentDto) {
        Member member = memberRepository.findById(paymentDto.getMemberId())
                .orElseThrow(() -> new IllegalArgumentException("해당 회원이 없습니다: id = " + paymentDto.getMemberId()));

        Payment payment = new Payment();
        payment.setMember(member);
        payment.setPaymentName(paymentDto.getPaymentName());
        payment.setPaymentNum(aesUtil.encrypt(paymentDto.getPaymentNum()));
        payment.setPaymentSecurity(aesUtil.encrypt(paymentDto.getPaymentSecurity()));
        payment.setPaymentPw(aesUtil.encrypt(paymentDto.getPaymentPw()));
        payment.setPaymentEndDt(paymentDto.getPaymentEndDt());
        payment.setPaymentOwner(paymentDto.getPaymentOwner());
        paymentRepository.save(payment);
    }

    /**
     * 설명 : 결제 수단 삭제
     * @param paymentId
     */
    @Override
    @Transactional
    public void deletePaymentDto(Integer paymentId) {
        if(!paymentRepository.existsById(paymentId)) throw new IllegalArgumentException("해당 결제 수단이 존재하지 않습니다. : id = " + paymentId);
        paymentRepository.deleteById(paymentId);
    }
}

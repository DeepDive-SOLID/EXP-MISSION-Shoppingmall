package solid.backend.mypage.payment.service;

import org.springframework.web.bind.annotation.RequestBody;
import solid.backend.mypage.payment.dto.PaymentAddDto;
import solid.backend.mypage.payment.dto.PaymentListDto;

import java.util.List;

public interface PaymentService {

    /**
     * 설명 : 결제 수단 리스트 조회
     * @param memberId
     * @return List<PaymentListDto>
     */
    List<PaymentListDto> getPaymentList(String memberId);

    /**
     * 설명 : 카드 이미지 조회
     * @param cardId
     * @return String
     */
    String getCardImg(Integer cardId);

    /**
     * 설명 : 결제 수단 추가
     * @param paymentDto
     */
    void addPaymentDto(PaymentAddDto paymentDto);

    /**
     * 설명 : 결제 수단 삭제
     * @param paymentId
     */
    void deletePaymentDto(Integer paymentId);
}

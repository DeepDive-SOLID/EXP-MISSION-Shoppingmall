package solid.backend.mypage.payment.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import solid.backend.mypage.payment.dto.PaymentAddDto;
import solid.backend.mypage.payment.dto.PaymentListDto;
import solid.backend.mypage.payment.service.PaymentService;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/mypage/payment")
public class PaymentController {

    private final PaymentService paymentService;

    /**
     * 설명 : 결제 수단 리스트 조회
     * @param memberId
     * @return List<PaymentListDto>
     */
    @ResponseBody
    @PostMapping("/getPaymentList")
    public List<PaymentListDto> getPaymentList(@RequestBody String memberId) {
        return paymentService.getPaymentList(memberId);
    }

    /**
     * 설명 : 카드 이미지 조회
     * @param cardId
     * @return String
     */
    @ResponseBody
    @PostMapping("/getCardImg")
    public String getCardImg(@RequestBody Integer cardId) {
        return paymentService.getCardImg(cardId);
    }

    /**
     * 설명 : 결제 수단 추가
     * @param paymentDto
     * @return ResponseEntity<String>
     */
    @ResponseBody
    @PostMapping("/addPaymentDto")
    public ResponseEntity<String> addPaymentDto(@RequestBody PaymentAddDto paymentDto) {
        try {
            paymentService.addPaymentDto(paymentDto);
            return ResponseEntity.ok("SUCCESS");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("FAIL");
        }
    }

    /**
     * 설명 : 결제 수단 삭제
     * @param paymentId
     * @return ResponseEntity<String>
     */
    @ResponseBody
    @DeleteMapping("/deletePaymentDto")
    public ResponseEntity<String> deletePaymentDto(@RequestBody Integer paymentId) {
        try {
            paymentService.deletePaymentDto(paymentId);
            return ResponseEntity.ok("SUCCESS");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("FAIL");
        }
    }
}

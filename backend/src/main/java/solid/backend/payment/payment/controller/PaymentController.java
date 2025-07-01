package solid.backend.payment.payment.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import solid.backend.entity.Orders;
import solid.backend.payment.payment.dto.*;
import solid.backend.payment.payment.service.PaymentService;

import java.util.List;

@Controller
@RequestMapping("/payment")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    /**
     * 설명: 주문(결제완료) 저장
     * @param orderAddDto
     * @return ResponseEntity<String>
     */
    @ResponseBody
    @PostMapping("/save")
    public ResponseEntity<String> addOrder(@RequestBody OrderAddDto orderAddDto) {
        try {
            Orders orders = paymentService.saveOrders(orderAddDto);
            paymentService.saveOrdersTravel(orderAddDto, orders);

            if (!orderAddDto.getProducts().isEmpty()) {
                paymentService.saveOrdersProduct(orderAddDto, orders);
            }
            paymentService.updateTravelAmount(orderAddDto.getTravelId(), orderAddDto.getOrderTravelAmount());
            return ResponseEntity.ok("SUCCESS");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("FAILED");
        }
    }

    /**
     * 설명: 해당 유저의 카드 정보 리스트
     * @param memberDto
     * @return List<PaymentCardDto>
     */
    @ResponseBody
    @PostMapping(value = "/card-info")
    public List<PaymentCardDto> getPaymentCardInfo(@RequestBody MemberDto memberDto) {
        return paymentService.getPaymentCardInfo(memberDto);
    }

    /**
     * 설명: 결제 수단(카드) 저장
     * @param paymentCardAddDto
     * @return ResponseEntity<String>
     */
    @ResponseBody
    @PostMapping("/add-card")
    public ResponseEntity<String> addPaymentCard(@RequestBody PaymentCardAddDto paymentCardAddDto) {
        try {
            paymentService.addPaymentCard(paymentCardAddDto);
            return ResponseEntity.ok("SUCCESS");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("FAILED");
        }
    }

    /**
     * 설명: 로그인 유저 정보 조회
     * @param memberDto
     * @return OrderMemberDto
     */
    @ResponseBody
    @PostMapping("/member-info")
    public OrderMemberDto getOrderMemberInfo(@RequestBody MemberDto memberDto) {
        return paymentService.getOrderMemberInfo(memberDto);
    }
}

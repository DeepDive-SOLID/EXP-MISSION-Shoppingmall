package solid.backend.payment.payment.service;

import solid.backend.entity.Orders;
import solid.backend.payment.payment.dto.*;

import java.util.List;

public interface PaymentService {

    /**
     * 설명: 주문(결제 성공 시) 저장, retrun Orders는 연관된 테이블 저장을 위함
     * @param orderAddDto
     * @return Orders
     */
    Orders saveOrders(OrderAddDto orderAddDto);

    /**
     * 설명: 주문 성공 시 연관된 테이블 (OrderTravel) 저장
     * @param orderAddDto
     * @param orders
     */
    void saveOrdersTravel(OrderAddDto orderAddDto, Orders orders);

    /**
     * 설명: 주문 성공 시 연관된 테이블 (OrderProduct) 저장
     * @param orderAddDto
     * @param orders
     */
    void saveOrdersProduct(OrderAddDto orderAddDto, Orders orders);

    /**
     * 설명: 결제 수단(카드) 저장
     * @param paymentCardAddDto
     */
    void addPaymentCard(PaymentCardAddDto paymentCardAddDto);

    /**
     * 해당하는 유저의 카드 정보 리스트 조회
     * @param memberDto
     * @return List<PaymentCardDto>
     */
    List<PaymentCardDto> getPaymentCardInfo(MemberDto memberDto);

    /**
     * 카드 앞 4자리에 따른 카드 이미지 추출
     * @param cardId
     * @return String
     */
    String getPaymentCardImg(Integer cardId);

    /**
     * 설명: 주문 페이지 시 로그인 했으면 유저 정보를 줌
     * @param memberDto
     * @return OrderMemberDto
     */
    OrderMemberDto getOrderMemberInfo(MemberDto memberDto);

    /**
     * 설명: 예약하면 상품의 갯수 업데이트
     * @param travelId
     * @param travelAmount
     */
    void updateTravelAmount(Integer travelId, Integer travelAmount);
}

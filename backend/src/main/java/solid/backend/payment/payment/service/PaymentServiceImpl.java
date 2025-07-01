package solid.backend.payment.payment.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import solid.backend.common.AESUtil;
import solid.backend.common.FileManager;
import solid.backend.entity.*;
import solid.backend.jpaRepository.*;
import solid.backend.payment.payment.dto.*;
import solid.backend.payment.payment.repository.PaymentQueryRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final OrdersRepository ordersRepository;
    private final MemberRepository memberRepository;
    private final PaymentRepository paymentRepository;
    private final TravelRepository travelRepository;
    private final ProductRepository productRepository;
    private final OrderTravelRepository orderTravelRepository;
    private final OrderProductRepository orderProductRepository;
    private final PaymentQueryRepository paymentQueryRepository;
    private final CardRepository cardRepository;
    private final FileManager fileManager;
    private final AESUtil aesUtil;


    /**
     * 설명: 주문(결제 성공 시) 저장, retrun Orders는 연관된 테이블 저장을 위함
     *
     * @param orderAddDto
     * @return Orders
     */
    @Override
    public Orders saveOrders(OrderAddDto orderAddDto) {
        Orders orders = new Orders();
        Member member = memberRepository.findById(orderAddDto.getMemberId()).orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다."));
        Payment payment = paymentRepository.findById(orderAddDto.getPaymentId()).orElseThrow(() -> new IllegalArgumentException("해당 카드가 없습니다."));
        orders.setPayment(payment);
        orders.setMember(member);
        orders.setOrderDt(LocalDate.now());
        orders.setOrderAddr(orderAddDto.getOrderAddr());
        orders.setOrderAddrDetail(orderAddDto.getOrderAddrDetail());
        orders.setOrderState(0);

        return ordersRepository.save(orders);
    }

    /**
     * 설명: 주문 성공 시 연관된 테이블 (OrderTravel) 저장
     *
     * @param orderAddDto
     * @param orders
     */
    @Override
    public void saveOrdersTravel(OrderAddDto orderAddDto, Orders orders) {
        OrderTravel orderTravel = new OrderTravel();
        Travel travel = travelRepository.findById(orderAddDto.getTravelId()).orElseThrow(() -> new IllegalArgumentException("해당 상품이 없습니다."));
        OrderTravelId key = new OrderTravelId(orders.getOrdersId(), orders.getPayment().getPaymentId(), orders.getMember().getMemberId(), orderAddDto.getTravelId());

        orderTravel.setId(key);
        orderTravel.setMember(orders.getMember());
        orderTravel.setPayment(orders.getPayment());
        orderTravel.setOrder(orders);
        orderTravel.setOrderTravelAmount(orderAddDto.getOrderTravelAmount());
        orderTravel.setTravel(travel);

        orderTravelRepository.save(orderTravel);
    }

    /**
     * 설명: 주문 성공 시 연관된 테이블 (OrderProduct) 저장
     *
     * @param orderAddDto
     * @param orders
     */
    @Transactional
    @Override
    public void saveOrdersProduct(OrderAddDto orderAddDto, Orders orders) {
        List<OrderProductDto> list = orderAddDto.getProducts();
        list.forEach(items -> {
            OrderProduct orderProduct = new OrderProduct();

            orderProduct.setOrder(orders);
            orderProduct.setMember(orders.getMember());
            orderProduct.setPayment(orders.getPayment());
            OrderProductId key = new OrderProductId(orders.getOrdersId(), orders.getPayment().getPaymentId(), orders.getMember().getMemberId(), items.getProductId());
            orderProduct.setId(key);
            Product product = productRepository.findById(items.getProductId()).orElseThrow(() -> new IllegalArgumentException("해당 제품이 없습니다."));
            orderProduct.setProduct(product);
            orderProduct.setOrderProductAmount(items.getOrderProductAmount());

            orderProductRepository.save(orderProduct);
        });
    }

    /**
     * 설명: 결제 수단(카드) 저장
     *
     * @param paymentCardAddDto
     */
    @Override
    public void addPaymentCard(PaymentCardAddDto paymentCardAddDto) {
        Member member = memberRepository.findById(paymentCardAddDto.getMemberId()).orElseThrow(() -> new IllegalArgumentException("해당 회원이 없습니다."));

        Payment payment = new Payment();
        payment.setMember(member);
        payment.setPaymentName(paymentCardAddDto.getPaymentName());
        payment.setPaymentNum(aesUtil.encrypt(paymentCardAddDto.getPaymentNum()));
        payment.setPaymentSecurity(aesUtil.encrypt(paymentCardAddDto.getPaymentSecurity()));
        payment.setPaymentPw(aesUtil.encrypt(paymentCardAddDto.getPaymentPw()));
        payment.setPaymentEndDt(paymentCardAddDto.getPaymentEndDt());
        payment.setPaymentOwner(paymentCardAddDto.getPaymentOwner());
        paymentRepository.save(payment);
    }

    /**
     * 해당하는 유저의 카드 정보 리스트 조회
     *
     * @param memberDto
     * @return List<PaymentCardDto>
     */
    @Override
    public List<PaymentCardDto> getPaymentCardInfo(MemberDto memberDto) {
        List<PaymentCardDto> list = paymentQueryRepository.PaymentCardInfo(memberDto);
        list.forEach(items -> {
            String cardNum = aesUtil.decrypt(items.getPaymentNum());
            items.setPaymentNum(cardNum);
            items.setPaymentCardImg(getPaymentCardImg(Integer.parseInt(cardNum.substring(0, 4))));
        });
        return list;
    }

    /**
     * 카드 앞 4자리에 따른 카드 이미지 추출
     *
     * @param cardId
     * @return String
     */
    @Override
    public String getPaymentCardImg(Integer cardId) {
        Card card = cardRepository.findById(cardId).orElseThrow(() -> new IllegalArgumentException("해당 카드가 없습니다."));
        return fileManager.getFileUrl(card.getCardImg());
    }

    /**
     * 설명: 주문 페이지 시 로그인 했으면 유저 정보를 줌
     * @param memberDto
     * @return OrderMemberDto
     */
    @Override
    public OrderMemberDto getOrderMemberInfo(MemberDto memberDto) {
        return paymentQueryRepository.getOrderMemberInfo(memberDto);
    }

    /**
     * 설명: 예약하면 상품의 갯수 업데이트
     * @param travelId
     * @param travelAmount
     */
    @Override
    public void updateTravelAmount(Integer travelId, Integer travelAmount) {
        Travel travel = travelRepository.findById(travelId).orElseThrow(() -> new IllegalArgumentException("해당하는 상품이 없습니다."));
        travel.setTravelAmount(travel.getTravelAmount() - travelAmount);
        if (travel.getTravelAmount() == 0) {
            travel.setTravelSold(true);
        }
        travelRepository.save(travel);
    }
}

package solid.backend.mypage.orders.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import solid.backend.admin.orders.dto.OrderProductDto;
import solid.backend.admin.orders.dto.OrderTravelDto;
import solid.backend.common.FileManager;
import solid.backend.entity.*;
import solid.backend.jpaRepository.*;
import solid.backend.mypage.orders.dto.*;
import solid.backend.mypage.orders.repository.*;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MypageOrdersServiceImpl implements MypageOrdersService {

    private final OrdersRepository ordersRepository;
    private final ReviewRepository reviewRepository;
    private final TravelRepository travelRepository;
    private final MemberRepository memberRepository;
    private final MypageOrdersQueryRepository mypageOrdersQueryRepository;
    private final FileManager fileManager;
    private final ProductRepository productRepository;

    /**
     * 설명 : 주문 내역 리스트 조회
     * @param memberId
     * @return List<MypageOrdersListDto>
     */
    @Override
    public List<MypageOrdersListDto> getOrdersList(String memberId) {
        return mypageOrdersQueryRepository.getOrdersList(memberId).stream()
                .peek(dto -> {
                    if (dto.getTravelImg() != null) {
                        dto.setTravelImg(fileManager.getFileUrl(dto.getTravelImg()));
                    }
                })
                .collect(Collectors.toList());
    }

    /**
     * 설명 : 예약 취소
     * @param ordersDto
     */
    @Override
    @Transactional
    public void updOrdersCancel(MypageOrdersUpdDto ordersDto) {
        Orders orders = ordersRepository.findById(ordersDto.getOrderId())
                .orElseThrow(() -> new IllegalArgumentException("해당 주문이 존재하지 않습니다: id = " + ordersDto.getOrderId()));
        orders.setOrderState(ordersDto.getOrderStatus());
        ordersRepository.save(orders);

        MypageTravelUpdate(ordersDto.getOrderId());
        MypageProductUpdate(ordersDto.getOrderId());
    }

    /**
     * 설명 : 리뷰 정보 추가
     * @param reviewDto
     */
    @Override
    @Transactional
    public void addOrdersReviewDto(MypageOrdersReviewAddDto reviewDto) {
        Travel travel = travelRepository.findById(reviewDto.getTravelId())
                .orElseThrow(() -> new IllegalArgumentException("해당 여행 상품이 없습니다: id = " + reviewDto.getTravelId()));

        Member member = memberRepository.findById(reviewDto.getMemberId())
                .orElseThrow(() -> new IllegalArgumentException("해당 회원이 없습니다: id = " + reviewDto.getMemberId()));

        Review review = new Review();
        review.setTravel(travel);
        review.setMember(member);
        review.setReviewRate(reviewDto.getReviewRate());
        review.setReviewComment(reviewDto.getReviewComment());
        reviewRepository.save(review);
    }

    /**
     * 설명 : 리뷰 정보 조회
     * @param reviewIds
     * @return MypageOrdersReviewDto
     */
    @Override
    public MypageOrdersReviewDto getOrdersReviewDto(MypageOrdersReviewIdDto reviewIds) {
        return mypageOrdersQueryRepository.getOrdersReviewDto(reviewIds);
    }

    /**
     * 설명 : 리뷰 정보 수정
     * @param reviewDto
     */
    @Override
    @Transactional
    public void updOrdersReviewDto(MypageOrdersReviewUpdDto reviewDto) {
        Review review = reviewRepository.findById(reviewDto.getReviewCode())
                .orElseThrow(() -> new IllegalArgumentException("해당 리뷰이 없습니다: id = " + reviewDto.getReviewCode()));
        review.setReviewRate(reviewDto.getReviewRate());
        review.setReviewComment(reviewDto.getReviewComment());
        reviewRepository.save(review);
    }

    /**
     * 설명: 관리자가 주문 취소 했을 시 travel 갯수 수정
     * @param orderId
     */
    private void MypageTravelUpdate(Integer orderId) {
        MypageTravelDto orderTravelDto = mypageOrdersQueryRepository.findOrderTravelById(orderId);
        Travel travel = travelRepository.findById(orderTravelDto.getTravelId()).orElseThrow(() -> new IllegalArgumentException("해당하는 상품이 없습니다."));

        int result = travel.getTravelAmount() + orderTravelDto.getOrderTravelAmount();
        travel.setTravelAmount(result);

        travelRepository.save(travel);
    }

    /**
     * 설명: 관리자가 주문 취소 했을 시 product 갯수 수정
     * @param orderId
     */
    private void MypageProductUpdate(Integer orderId) {
        List<MypageProductDto> orderProductDto = mypageOrdersQueryRepository.findOrderProductById(orderId);

        orderProductDto.forEach(items -> {
            Product product = productRepository.findById(items.getProductId()).orElseThrow(() -> new IllegalArgumentException("해당하는 물품이 없습니다."));

            int result = product.getProductAmount() + items.getOrderProductAmount();
            product.setProductAmount(result);
            productRepository.save(product);
        });
    }
}

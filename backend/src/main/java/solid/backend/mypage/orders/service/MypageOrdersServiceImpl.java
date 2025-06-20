package solid.backend.mypage.orders.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import solid.backend.common.FileManager;
import solid.backend.entity.Member;
import solid.backend.entity.Orders;
import solid.backend.entity.Review;
import solid.backend.entity.Travel;
import solid.backend.jpaRepository.MemberRepository;
import solid.backend.jpaRepository.OrdersRepository;
import solid.backend.jpaRepository.ReviewRepository;
import solid.backend.jpaRepository.TravelRepository;
import solid.backend.mypage.orders.dto.MypageOrdersListDto;
import solid.backend.mypage.orders.dto.MypageOrdersReviewDto;
import solid.backend.mypage.orders.dto.MypageOrdersUpdDto;
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
    }

    /**
     * 설명 : 리뷰 정보 추가
     * @param reviewDto
     */
    @Override
    @Transactional
    public void addOrdersReviewDto(MypageOrdersReviewDto reviewDto) {
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
}

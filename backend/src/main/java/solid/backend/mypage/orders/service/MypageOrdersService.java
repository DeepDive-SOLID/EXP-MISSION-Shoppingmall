package solid.backend.mypage.orders.service;

import solid.backend.mypage.orders.dto.MypageOrdersListDto;
import solid.backend.mypage.orders.dto.MypageOrdersReviewDto;
import solid.backend.mypage.orders.dto.MypageOrdersUpdDto;

import java.util.List;

public interface MypageOrdersService {

    /**
     * 설명 : 주문 내역 리스트 조회
     * @param memberId
     * @return List<MypageOrdersListDto>
     */
    List<MypageOrdersListDto> getOrdersList(String memberId);

    /**
     * 설명 : 예약 취소
     * @param ordersDto
     */
    void updOrdersCancel(MypageOrdersUpdDto ordersDto);

    /**
     * 설명 : 리뷰 정보 추가
     * @param reviewDto
     */
    void addOrdersReviewDto(MypageOrdersReviewDto reviewDto);
}

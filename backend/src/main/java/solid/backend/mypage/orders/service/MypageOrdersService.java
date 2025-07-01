package solid.backend.mypage.orders.service;

import solid.backend.mypage.orders.dto.*;

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
    void addOrdersReviewDto(MypageOrdersReviewAddDto reviewDto);

    /**
     * 설명 : 리뷰 정보 조회
     * @param reviewIds
     * @return MypageOrdersReviewDto
     */
    MypageOrdersReviewDto getOrdersReviewDto(MypageOrdersReviewIdDto reviewIds);

    /**
     * 설명 : 리뷰 정보 수정
     * @param reviewDto
     */
    void updOrdersReviewDto(MypageOrdersReviewUpdDto reviewDto);
}

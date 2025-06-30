package solid.backend.payment.basket.service;

import solid.backend.payment.basket.dto.BasketAddDto;
import solid.backend.payment.basket.dto.BasketListDto;
import solid.backend.payment.basket.dto.BasketMemberDto;

import java.util.List;

public interface BasketService {

    /**
     * 설명: 장바구니에서 결제하기 화면으로 바로 넘어갈때 넘겨줄 데이터
     * @param basketId
     * @return BasketListDto
     */
    BasketListDto getBasketOne(Integer basketId);

    /**
     * 설명: 장바구니 저장
     * @param basketAddDto
     */
    void save(BasketAddDto basketAddDto);

    /**
     * 설명: 장바구니 삭제
     * @param basketId
     */
    void delete(Integer basketId);
    /**
     * 설명: 해당하는 유저의 장바구니 리스트 조회
     * @param basketMemberDto
     * @return List<BasketListDto>
     */
    List<BasketListDto> getListBasket(BasketMemberDto basketMemberDto);
}

package solid.backend.payment.basket.service;

import solid.backend.payment.basket.dto.BasketAddDto;
import solid.backend.payment.basket.dto.BasketListDto;

import java.util.List;

public interface BasketService {
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
     * @param memberId
     * @return List<BasketListDto>
     */
    List<BasketListDto> getListBasket(String memberId);
}

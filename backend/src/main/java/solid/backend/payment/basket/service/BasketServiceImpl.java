package solid.backend.payment.basket.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import solid.backend.entity.Basket;
import solid.backend.entity.Product;
import solid.backend.jpaRepository.BasketRepository;
import solid.backend.jpaRepository.MemberRepository;
import solid.backend.jpaRepository.ProductRepository;
import solid.backend.jpaRepository.TravelRepository;
import solid.backend.payment.basket.dto.BasketAddDto;
import solid.backend.payment.basket.dto.BasketListDto;
import solid.backend.payment.basket.dto.BasketMemberDto;
import solid.backend.payment.basket.repository.BasketQueryRepository;

import java.util.List;


@Service
@RequiredArgsConstructor
public class BasketServiceImpl implements BasketService {
    private final BasketRepository basketRepository;
    private final MemberRepository memberRepository;
    private final TravelRepository travelRepository;
    private final ProductRepository productRepository;
    private final BasketQueryRepository basketQueryRepository;

    /**
     * 설명: 장바구니 저장
     *
     * @param basketAddDto
     */
    @Override
    public void save(BasketAddDto basketAddDto) {
        Basket basket = new Basket();
        basket.setMember(memberRepository.findById(basketAddDto.getMemberId()).orElseThrow(() -> new IllegalArgumentException("해당 하는 유저가 없습니다.")));
        basket.setTravel(travelRepository.findById(basketAddDto.getTravelId()).orElseThrow(() -> new IllegalArgumentException("해당 하는 상품이 없습니다.")));
        basket.setBasketTravelAmount(basketAddDto.getBasketTravelAmount());
        if (basketAddDto.getProductId() != null) {
            basket.setProduct(productRepository.findById(basketAddDto.getProductId()).orElseThrow(() -> new IllegalArgumentException("해당 하는 물품이 없습니다.")));
            basket.setBasketProductAmount(basketAddDto.getBasketProductAmount());
        } else {
            basket.setProduct(null);
            basket.setBasketProductAmount(null);
        }

        basketRepository.save(basket);
    }

    /**
     * 설명: 장바구니 삭제
     *
     * @param basketId
     */
    @Override
    public void delete(Integer basketId) {
        Basket basket = basketRepository.findById(basketId).orElseThrow(() -> new IllegalArgumentException("해당하는 상품이 없습니다."));
        basketRepository.delete(basket);
    }

    /**
     * 설명: 해당하는 유저의 장바구니 리스트 조회
     *
     * @param basketMemberDto
     * @return List<BasketListDto>
     */
    @Override
    public List<BasketListDto> getListBasket(BasketMemberDto basketMemberDto) {
        return basketQueryRepository.getListBasket(basketMemberDto.getMemberId());
    }
}

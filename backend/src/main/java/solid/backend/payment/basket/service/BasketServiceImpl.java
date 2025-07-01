package solid.backend.payment.basket.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import solid.backend.common.FileManager;
import solid.backend.entity.Basket;
import solid.backend.entity.Member;
import solid.backend.entity.Travel;
import solid.backend.jpaRepository.BasketRepository;
import solid.backend.jpaRepository.MemberRepository;
import solid.backend.jpaRepository.ProductRepository;
import solid.backend.jpaRepository.TravelRepository;
import solid.backend.payment.basket.dto.BasketAddDto;
import solid.backend.payment.basket.dto.BasketListDto;
import solid.backend.payment.basket.dto.BasketMemberDto;
import solid.backend.payment.basket.dto.BasketProductDto;
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
    private final FileManager fileManager;

    /**
     * 설명: 장바구니에서 결제하기 화면으로 바로 넘어갈때 넘겨줄 데이터
     *
     * @param basketId
     * @return BasketListDto
     */
    @Override
    public BasketListDto getBasketOne(Integer basketId) {
        BasketListDto basketListDto = basketQueryRepository.getBasketOne(basketId);
        basketListDto.setTravelImg(fileManager.getFileUrl(basketListDto.getTravelImg()));
        return basketListDto;
    }

    /**
     * 설명: 장바구니 저장
     *
     * @param basketAddDto
     */
    @Transactional
    @Override
    public void save(BasketAddDto basketAddDto) {
        List<BasketProductDto> list = basketAddDto.getProducts();
        if (!list.isEmpty()) {
            list.forEach(items -> {
                Basket basket = getBasket(basketAddDto);
                basket.setProduct(productRepository.findById(items.getProductId()).orElseThrow(() -> new IllegalArgumentException("해당 하는 물품이 없습니다.")));
                basket.setBasketProductAmount(items.getBasketProductAmount());
                basketRepository.save(basket);
            });
        } else {
            Basket basket = getBasket(basketAddDto);
            basket.setProduct(null);
            basket.setBasketProductAmount(null);
            basketRepository.save(basket);
        }
    }

    /**
     * 설명: 중복 로직 메서드화
     * @param basketAddDto
     * @return Basket
     */
    private Basket getBasket(BasketAddDto basketAddDto) {
        Basket basket = new Basket();
        basket.setMember(memberRepository.findById(basketAddDto.getMemberId()).orElseThrow(() -> new IllegalArgumentException("해당 하는 유저가 없습니다.")));
        basket.setTravel(travelRepository.findById(basketAddDto.getTravelId()).orElseThrow(() -> new IllegalArgumentException("해당 하는 상품이 없습니다.")));
        basket.setBasketTravelAmount(basketAddDto.getBasketTravelAmount());

        return basket;
    }

    /**
     * 설명: 장바구니 삭제
     *
     * @param travelId
     */
    @Transactional
    @Override
    public void delete(Integer travelId, String memberId) {
        Travel travel = travelRepository.findById(travelId).orElseThrow(() -> new IllegalArgumentException("해당하는 상품이 없습니다"));
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new IllegalArgumentException("해당하는 유저가 없습니다"));
        basketRepository.deleteAllByTravelAndMember(travel, member);
    }

    /**
     * 설명: 해당하는 유저의 장바구니 리스트 조회
     *
     * @param basketMemberDto
     * @return List<BasketListDto>
     */
    @Override
    public List<BasketListDto> getListBasket(BasketMemberDto basketMemberDto) {
        List<BasketListDto> list = basketQueryRepository.getListBasket(basketMemberDto.getMemberId());

        list.forEach(items -> {
                    items.setReservedCount(basketQueryRepository.getOrderTravelAmount(items.getTravelId()));
                    items.setBasketProducts(basketQueryRepository.getListProduct(basketMemberDto.getMemberId(), items.getTravelId()));
                    items.setTravelImg(fileManager.getFileUrl(items.getTravelImg()));
                }
        );
        return list;
    }
}

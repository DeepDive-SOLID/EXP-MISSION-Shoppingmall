package solid.backend.main.home.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import solid.backend.admin.product.repository.ProductRepository;
import solid.backend.entity.Travel;
import solid.backend.main.home.dto.HomeDetailDto;
import solid.backend.main.home.dto.HomeSearchDto;
import solid.backend.main.home.dto.HomeTravelDto;
import solid.backend.main.home.repository.HomeQueryRepository;
import solid.backend.main.home.repository.HomeRepository;


import java.util.List;

@Service
@RequiredArgsConstructor
public class HomeServiceImpl implements HomeService {

    private final HomeRepository homeRepository;
    private final HomeQueryRepository homeQueryRepository;
    private final ProductRepository productRepository;

    /**
     * 설명: 홈 화면에 나오는 여행상품 리스트
     * @return List<Travel>
     */
    @Override
    public List<Travel> getTravelList() {
        return homeRepository.findAll();
    }

    /**
     * 설명: 검색 시 조건에 따른 여행상품 리스트
     *      sort 조건이 있어 1 -> 최근, 2 -> 인기, 3 -> 리뷰순
     * @param homeSearchDto
     * @return List<HomeTravelDto>
     */
    @Override
    public List<HomeTravelDto> searchTravel(HomeSearchDto homeSearchDto) {
        switch (homeSearchDto.getSorted()) {
            case 1:
                return homeQueryRepository.searchTravelSortedNew(homeSearchDto);
            case 2:
                return homeQueryRepository.searchTravelSortedPopular(homeSearchDto);
            default:
                return homeQueryRepository.searchTravelSortedReview(homeSearchDto);
        }
    }

    @Override
    public HomeDetailDto getTravelDetailPage(Integer travelId) {
        HomeDetailDto homeDetailDto = new HomeDetailDto();
        homeDetailDto.setTravel(homeRepository.findById(travelId)
                .orElseThrow(() -> new IllegalArgumentException("해당 하는 상품이 없습니다.")));
        homeDetailDto.setReviews(homeQueryRepository.getTravelReviewList(travelId));
        homeDetailDto.setProduct(productRepository.findAll());

        return homeDetailDto;
    }
}

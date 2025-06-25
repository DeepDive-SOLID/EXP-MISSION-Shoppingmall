package solid.backend.main.home.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import solid.backend.common.FileManager;
import solid.backend.entity.Product;
import solid.backend.entity.Travel;
import solid.backend.jpaRepository.ProductRepository;
import solid.backend.jpaRepository.TravelRepository;
import solid.backend.main.home.dto.HomeDetailDto;
import solid.backend.main.home.dto.HomeSearchDto;
import solid.backend.main.home.dto.HomeTravelDto;
import solid.backend.main.home.repository.HomeQueryRepository;


import java.util.List;

@Service
@RequiredArgsConstructor
public class HomeServiceImpl implements HomeService {


    private final HomeQueryRepository homeQueryRepository;
    private final ProductRepository productRepository;
    private final TravelRepository travelRepository;
    private final FileManager fileManager;

    /**
     * 설명: 홈 화면에 나오는 여행상품 리스트
     * @return List<Travel>
     */
    @Override
    public List<Travel> getTravelList() {
        return travelRepository.findAll();
    }

    /**
     * 설명: 검색 시 조건에 따른 여행상품 리스트
     *      sort 조건이 있어 1 -> 최근, 2 -> 인기, 3 -> 리뷰순
     * @param homeSearchDto
     * @return List<HomeTravelDto>
     */
    @Override
    public List<HomeTravelDto> searchTravel(HomeSearchDto homeSearchDto) {

        List<HomeTravelDto> list = switch (homeSearchDto.getSorted()) {
            case 1 -> homeQueryRepository.searchTravelSortedNew(homeSearchDto);
            case 2 -> homeQueryRepository.searchTravelSortedPopular(homeSearchDto);
            default -> homeQueryRepository.searchTravelSortedReview(homeSearchDto);
        };
        // 이미지 경로 재설정
        list.forEach(items -> items.setTravelImg(fileManager.getFileUrl(items.getTravelImg())));
        return list;
    }

    /**
     * 설명: 상세 페이지 상품, 물품, 리뷰 데이터
     * @param travelId
     * @return HomeDetailDto
     */
    @Override
    public HomeDetailDto getTravelDetailPage(Integer travelId) {
        HomeDetailDto homeDetailDto = new HomeDetailDto();
        homeDetailDto.setTravel(travelRepository.findById(travelId)
                .orElseThrow(() -> new IllegalArgumentException("해당 하는 상품이 없습니다.")));
        homeDetailDto.setReviews(homeQueryRepository.getTravelReviewList(travelId));

        // 이미지 경로 재설정
        List<Product> product = productRepository.findAll();
        product.forEach(items -> items.setProductImg(fileManager.getFileUrl(items.getProductImg())));
        homeDetailDto.setProduct(product);

        return homeDetailDto;
    }
}

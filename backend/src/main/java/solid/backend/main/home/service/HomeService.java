package solid.backend.main.home.service;

import solid.backend.entity.Travel;
import solid.backend.main.home.dto.HomeDetailDto;
import solid.backend.main.home.dto.HomeSearchDto;
import solid.backend.main.home.dto.HomeTravelDto;

import java.util.List;

public interface HomeService {

    /**
     * 설명: 홈 화면에 나오는 여행상품 리스트
     * @return List<Travel>
     */
    List<Travel> getTravelList();

    /**
     * 설명: 검색 시 조건에 따른 여행상품 리스트
     * @param homeSearchDto
     * @return List<HomeTravelDto>
     */
    List<HomeTravelDto> searchTravel(HomeSearchDto homeSearchDto);

    HomeDetailDto getTravelDetailPage(Integer travelId);
}

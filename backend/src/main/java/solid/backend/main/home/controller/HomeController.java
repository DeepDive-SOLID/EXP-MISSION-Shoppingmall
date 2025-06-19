package solid.backend.main.home.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import solid.backend.entity.Travel;
import solid.backend.main.home.dto.HomeDetailDto;
import solid.backend.main.home.dto.HomeSearchDto;
import solid.backend.main.home.dto.HomeTravelDto;
import solid.backend.main.home.service.HomeService;

import java.util.List;

@Controller
@RequestMapping("/home")
@RequiredArgsConstructor
public class HomeController {

    private final HomeService homeService;

    /**
     * 설명: 홈 화면 여행상품 리스트
     * @return List<Travel>
     */
    @ResponseBody
    @GetMapping("/list")
    public List<Travel> getTravelList() {
        return homeService.getTravelList();
    }

    /**
     * 설명: 검색 시 해당하는 조건에 따른 여행상품 리스트
     * @param search
     * @return List<HomeTravelDto>
     */
    @ResponseBody
    @PostMapping("/search")
    public List<HomeTravelDto> searchTravel(@RequestBody HomeSearchDto search) {
        return homeService.searchTravel(search);
    }

    /**
     * 설명: 상세 페이지 해당하는 상품, 물품, 리뷰 데이터 리스트
     * @param travelId
     * @return HomeDetailDto
     */
    @ResponseBody
    @GetMapping("/detail-page")
    public HomeDetailDto getTravelDetailPage(@RequestParam Integer travelId) {
        return homeService.getTravelDetailPage(travelId);
    }


}

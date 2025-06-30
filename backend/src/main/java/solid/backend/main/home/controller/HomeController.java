package solid.backend.main.home.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import solid.backend.main.home.dto.*;
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
    public List<HomeTravelDto> getTravelList() {
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
     * 설명: 상세 페이지 해당하는 리뷰 데이터 리스트
     * @param travelId
     * @return List<HomeReviewDto>
     */
    @ResponseBody
    @GetMapping("/detail-page-reviews")
    public List<HomeReviewDto> getTravelDetailPageReviews(@RequestParam Integer travelId) {
        return homeService.getTravelDetailPageReviews(travelId);
    }
    /**
     * 설명: 상세 페이지 해당하는 물품 데이터 리스트
     * @return List<HomeProductDto>
     */
    @ResponseBody
    @GetMapping("/detail-page-products")
    public List<HomeProductDto> getTravelDetailPageProduct() {
        return homeService.getTravelDetailPageProduct();
    }



}

package solid.backend.mypage.orders.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import solid.backend.mypage.orders.dto.*;
import solid.backend.mypage.orders.service.MypageOrdersService;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/mypage/orders")
public class MypageOrdersController {

    private final MypageOrdersService mypageOrdersService;

    /**
     * 설명 : 주문 내역 리스트 조회
     * @param memberId
     * @return List<MypageOrdersListDto>
     */
    @ResponseBody
    @PostMapping("/getOrdersList")
    public List<MypageOrdersListDto> getOrdersList(@RequestBody String memberId) {
        return mypageOrdersService.getOrdersList(memberId);
    }

    /**
     * 설명 : 예약 취소
     * @param ordersDto
     * @return ResponseEntity<String>
     */
    @ResponseBody
    @PutMapping("/updOrdersCancel")
    public ResponseEntity<String> updOrdersCancel(@RequestBody MypageOrdersUpdDto ordersDto) {
        try {
            mypageOrdersService.updOrdersCancel(ordersDto);
            return ResponseEntity.ok("SUCCESS");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("FAIL");
        }
    }

    /**
     * 설명 : 리뷰 정보 추가
     * @param reviewDto
     * @return ResponseEntity<String>
     */
    @ResponseBody
    @PostMapping("/addOrdersReviewDto")
    public ResponseEntity<String> addOrdersReviewDto(@RequestBody MypageOrdersReviewAddDto reviewDto) {
        try {
            mypageOrdersService.addOrdersReviewDto(reviewDto);
            return ResponseEntity.ok("SUCCESS");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("FAIL");
        }
    }

    /**
     * 설명 : 리뷰 정보 조회
     * @param reviewIds
     * @return MypageOrdersReviewDto
     */
    @ResponseBody
    @PostMapping("/getOrdersReviewDto")
    public MypageOrdersReviewDto getOrdersReviewDto(@RequestBody MypageOrdersReviewIdDto reviewIds) {
        return mypageOrdersService.getOrdersReviewDto(reviewIds);
    }

    /**
     * 설명 : 리뷰 정보 수정
     * @param reviewDto
     * @return ResponseEntity<String>
     */
    @ResponseBody
    @PutMapping("/updOrdersReviewDto")
    public ResponseEntity<String> updOrdersReviewDto(@RequestBody MypageOrdersReviewUpdDto reviewDto) {
        try {
            mypageOrdersService.updOrdersReviewDto(reviewDto);
            return ResponseEntity.ok("SUCCESS");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("FAIL");
        }
    }
}

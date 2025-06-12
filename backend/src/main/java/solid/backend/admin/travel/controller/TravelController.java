package solid.backend.admin.travel.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import solid.backend.admin.travel.service.TravelService;
import solid.backend.admin.travel.dto.*;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/admin/travel")
public class TravelController {
    private final TravelService travelService;

    /**
     * 설명 : 여행 상품 조회
     * @return List<TravelSummaryDto>
     */
    @ResponseBody
    @GetMapping("/getTravelList")
    public List<TravelSummaryDto> getTravelListCustom() {
        return travelService.getTravelList();
    }

    /**
     * 설명 : 모든 여행 상품 조회
     * @return List<TravelDto>
     */
    @ResponseBody
    @GetMapping("/getTravelListAll")
    public List<TravelDto> getTravelList() {
        return travelService.getTravelListAll();
    }

    /**
     * 설명 : 여행 상품 추가
     * @return AddTravelDto
     */
    @ResponseBody
    @PostMapping("/addTravel")
    public ResponseEntity<String> addTravel(@RequestBody AddTravelDto addTravelDto) {
        try {
            travelService.addTravel(addTravelDto);
            return ResponseEntity.ok("SUCCESS");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("FAIL");
        }
    }

    /**
     * 설명 : 여행 상품 수정
     * @return UpdateTravelDto
     */
    @ResponseBody
    @PutMapping("/updateTravel")
    public ResponseEntity<String> updateTravel(@RequestBody UpdateTravelDto updateTravelDto) {
        try {
            travelService.updateTravel(updateTravelDto);
            return ResponseEntity.ok("SUCCESS");
        } catch (Exception e) {
            e.printStackTrace();
            return  ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("FAIL");
        }
    }

    @ResponseBody
    @DeleteMapping("/deleteTravel")
    public ResponseEntity<String> deleteTravel(@RequestBody DeleteTravelDto deleteTravelDto) {
        try {
            travelService.deleteTravel(deleteTravelDto);
            return ResponseEntity.ok("SUCCESS");
        } catch (Exception e) {
            e.printStackTrace();
            return   ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("FAIL");
        }
    }
}

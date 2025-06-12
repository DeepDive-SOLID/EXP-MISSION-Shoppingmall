package solid.backend.admin.travel.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import solid.backend.admin.travel.dto.TravelAddDto;
import solid.backend.admin.travel.dto.TravelListAllDto;
import solid.backend.admin.travel.dto.TravelListDto;
import solid.backend.admin.travel.dto.TravelUpdDto;
import solid.backend.admin.travel.service.TravelService;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/admin/travel")
public class TravelController {
    private final TravelService travelService;


    /**
     * 설명 : 여행 상품 조회
     * @return List<TravelListDto>
     */
    @ResponseBody
    @GetMapping("/getTravelList")
    public List<TravelListDto> getTravelList() {
        return travelService.getTravelList();
    }

    /**
     * 설명 : 모든 여행 상품 조회
     * @return List<TravelListAllDto>
     */
    @ResponseBody
    @GetMapping("/getTravelListAll")
    public List<TravelListAllDto> getTravelListAll() {
        return travelService.getTravelListAll();
    }

    /**
     * 설명 : 여행 상품 추가
     * @param travelAddDto
     * @return ResponseBodyEntity<String>
     */
    @ResponseBody
    @PostMapping("/addTravel")
    public ResponseEntity<String> addTravelDto(@RequestBody TravelAddDto travelAddDto) {
        try {
            travelService.addTravelDto(travelAddDto);
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
     * @param travelUpdDto
     * @return ResponseBodyEntity<String>
     */
    @ResponseBody
    @PutMapping("/updateTravel")
    public ResponseEntity<String> updTravelDto(@RequestBody TravelUpdDto travelUpdDto) {
        try {
            travelService.updTravelDto(travelUpdDto);
            return ResponseEntity.ok("SUCCESS");
        } catch (Exception e) {
            e.printStackTrace();
            return  ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("FAIL");
        }
    }

    /**
     * 설명 : 여행 상품 수정
     * @param travelId
     * @return ResponseBodyEntity<String>
     */
    @ResponseBody
    @DeleteMapping("/deleteTravel")
    public ResponseEntity<String> delTravelDto(@RequestBody Integer travelId) {
        try {
            travelService.delTravelDto(travelId);
            return ResponseEntity.ok("SUCCESS");
        } catch (Exception e) {
            e.printStackTrace();
            return   ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("FAIL");
        }
    }
}

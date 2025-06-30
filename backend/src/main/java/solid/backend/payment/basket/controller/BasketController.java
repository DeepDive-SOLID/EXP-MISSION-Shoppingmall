package solid.backend.payment.basket.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import solid.backend.payment.basket.dto.BasketAddDto;
import solid.backend.payment.basket.dto.BasketDeleteDto;
import solid.backend.payment.basket.dto.BasketListDto;
import solid.backend.payment.basket.dto.BasketMemberDto;
import solid.backend.payment.basket.service.BasketService;

import java.util.List;

@Controller
@RequestMapping("/payment/basket")
@RequiredArgsConstructor
public class BasketController {
    private final BasketService basketService;

    /**
     * 설명: 장바구니 저장
     * @param basketAddDto
     * @return ResponseEntity<String>
     */
    @ResponseBody
    @PostMapping("/save")
    public ResponseEntity<String> saveBasket(@RequestBody BasketAddDto basketAddDto) {
        try {
            basketService.save(basketAddDto);
            return ResponseEntity.ok("SUCCESS");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("FAIL");
        }
    }

    /**
     * 설명: 장바구니 삭제
     * @param basketDeleteDto
     * @return ResponseEntity<String>
     */
    @ResponseBody
    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteBasket(@RequestBody BasketDeleteDto basketDeleteDto) {
        try {
            basketService.delete(basketDeleteDto.getBasketId());
            return ResponseEntity.ok("SUCCESS");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("FAIL");
        }
    }

    /**
     * 설명: 해당하는 유저의 장바구니 리스트
     * @param basketMemberDto
     * @return List<BasketListDto>
     */
    @ResponseBody
    @PostMapping("/list")
    public List<BasketListDto> getBasketList(@RequestBody BasketMemberDto basketMemberDto) {
        return basketService.getListBasket(basketMemberDto);
    }
}

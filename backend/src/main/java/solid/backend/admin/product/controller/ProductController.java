package solid.backend.admin.product.controller;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import solid.backend.admin.product.dto.ProductAddDto;
import solid.backend.admin.product.dto.ProductListDto;
import solid.backend.admin.product.dto.ProductSearchDto;
import solid.backend.admin.product.dto.ProductUpdDto;
import solid.backend.admin.product.service.ProductService;
import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/admin/product")
public class ProductController {

    private final ProductService productService;

    /**
     * 설명 : 물품 리스트 정보
     * @return List<ProductListDto>
     */
    @ResponseBody
    @GetMapping("/getProductList")
    public List<ProductListDto> getProductList() {
        return productService.getProductList();
    }

    /**
     * 설명 : 물품 정보 추가
     * @param productDto
     * @return ResponseEntity<String>
     */
    @PostMapping("/addProductDto")
    public ResponseEntity<String> addProductDto(@ModelAttribute ProductAddDto productDto) {
        try {
            productService.addProductDto(productDto);
            return ResponseEntity.ok("SUCCESS");

        // 사용자가 잘못 입력한 경우 (ex: 파일 크기 초과 등)
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());

        // 그 외 서버 오류
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("FAIL");
        }
    }

    /**
     * 설명 : 물품 정보 수정
     * @param productDto
     * @return ResponseEntity<String>
     */
    @ResponseBody
    @PutMapping("/updateProductDto")
    public ResponseEntity<String> updateProductDto(@RequestBody ProductUpdDto productDto) {
        try {
            productService.updateProductDto(productDto);
            return ResponseEntity.ok("SUCCESS");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("FAIL");
        }
    }

    /**
     * 설명 : 물품 정보 삭제
     * @param productId
     * @return ResponseEntity<String>
     */
    @ResponseBody
    @DeleteMapping("/deleteProductDto")
    public ResponseEntity<String> deleteProductDto(@RequestBody Integer productId) {
        try {
            productService.deleteProductDto(productId);
            return ResponseEntity.ok("SUCCESS");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("FAIL");
        }
    }

    /**
     * 설명 : 물품 정보 검색
     * @param productDto
     * @return List<ProductListDto>
     */
    @ResponseBody
    @PostMapping("/searchProductList")
    public List<ProductListDto> searchProductList(@RequestBody ProductSearchDto productDto) {
        return productService.searchProductList(productDto);
    }
}

package solid.backend.main.home.dto;

import lombok.Data;
import solid.backend.entity.Product;
import solid.backend.entity.Travel;

import java.util.List;

@Data
public class HomeDetailDto {
    private Travel travel;
    private List<HomeReviewDto> reviews;
    private List<Product> product;
}

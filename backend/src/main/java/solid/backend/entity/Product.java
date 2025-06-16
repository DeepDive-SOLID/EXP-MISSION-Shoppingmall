package solid.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Comment;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Comment("물품 코드")
    private Integer productId;

    @Column(name = "product_name", nullable = false)
    @Comment("물품 이름")
    private String productName;

    @Column(name = "product_price", nullable = false)
    @Comment("물품 금액")
    private Integer productPrice;

    @Column(name = "product_amount", nullable = false)
    @Comment("물품 남은 수량")
    private Integer productAmount;

    @Column(name = "product_sold" ,nullable = false)
    @Comment("true: 품절 false: 품절x")
    @ColumnDefault("false")
    private Boolean productSold;

    @Column(name = "product_upload_dt", nullable = false)
    @Comment("물품 등록일")
    private LocalDate productUploadDt;

    @Column(name = "product_update_dt", nullable = false)
    @Comment("물품 수정일")
    private LocalDate productUpdateDt;

    @Column(name = "product_img", length = 100)
    @Comment("이미지")
    private String productImg;

//    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY)
//    @JsonIgnore
//    private List<OrderProduct> orderProducts = new ArrayList<>();
}

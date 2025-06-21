package solid.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Comment;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "travel")
public class Travel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "travel_id")
    @Comment("상품 코드")
    private Integer travelId;

    @Column(name = "travel_name", nullable = false, length = 50)
    @Comment("상품 이름")
    private String travelName;

    @Column(name = "travel_price", nullable = false)
    @Comment("상품 금액")
    private Integer travelPrice;

    @Column(name = "travel_amount", nullable = false)
    @Comment("상품 남은 수량")
    private Integer travelAmount;

    @Column(name = "travel_sold", nullable = false)
    @Comment("true: 품절 false: 품절x")
    @ColumnDefault("false")
    private Boolean travelSold;

    @Column(name = "travel_comment", nullable = false, length = 500)
    @Comment("상품 설명서")
    private String travelComment;

    @Column(name = "travel_label", length = 200)
    @Comment("상품 태그")
    private String travelLabel;

    @Column(name = "travel_start_dt", nullable = false)
    @Comment("기간(시작일)")
    private LocalDate travelStartDt;

    @Column(name = "travel_end_dt", nullable = false)
    @Comment("기간(종료일)")
    private LocalDate travelEndDt;

    @Column(name = "travel_upload_dt", nullable = false)
    @Comment("상품 등록일")
    private LocalDate travelUploadDt;

    @Column(name = "travel_update_dt", nullable = false)
    @Comment("상품 수정일")
    private LocalDate travelUpdateDt;

    @Column(name = "travel_img", length = 500)
    @Comment("이미지")
    private String travelImg;

//    @OneToMany(mappedBy = "travel", fetch = FetchType.LAZY)
//    @JsonIgnore
//    private List<OrderTravel> orderTravels = new ArrayList<>();
}

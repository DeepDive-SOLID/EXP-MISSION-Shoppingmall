package solid.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.Comment;

@Data
@Entity
@Table(name = "card")
public class Card {

    @Id
    @Column(name = "card_id")
    @Comment("카드 식별 번호")
    private Integer cardId;

    @Column(name = "card_img", nullable = false, length = 200)
    @Comment("카드 이미지")
    private String cardImg;
}
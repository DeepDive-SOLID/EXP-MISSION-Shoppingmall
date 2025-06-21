package solid.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Comment;

@Data
@Entity
@Table(name = "review")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_code")
    @Comment("리뷰 고유번호")
    private Integer reviewCode;

    @Column(name = "review_rate")
    @Comment("리뷰 별점")
    @ColumnDefault("1")
    private Integer reviewRate;

    @Column(name = "review_comment", nullable = false, length = 200)
    @Comment("리뷰 내용")
    private String reviewComment;

    @ManyToOne
    @JoinColumn(name = "travel_id", nullable = false)
    @Comment("상품 코드")
    private Travel travel;

    @ManyToOne
    @JoinColumn(name = "member_id", nullable = false)
    @Comment("회원 ID")
    private Member member;
}

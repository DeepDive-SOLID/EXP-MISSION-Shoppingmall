package solid.backend.jpaRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import solid.backend.entity.Basket;
import solid.backend.entity.Member;
import solid.backend.entity.Travel;

public interface BasketRepository extends JpaRepository<Basket, Integer> {

    /**
     * 설명: 장바구니 삭제 시 travel,member 기준으로 전체 삭제
     * @param travel
     * @param member
     */
    void deleteAllByTravelAndMember(Travel travel, Member member);
}

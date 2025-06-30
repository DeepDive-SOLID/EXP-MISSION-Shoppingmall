package solid.backend.jpaRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import solid.backend.entity.Basket;
import solid.backend.entity.Member;
import solid.backend.entity.Travel;

public interface BasketRepository extends JpaRepository<Basket, Integer> {

    void deleteAllByTravelAndMember(Travel travel, Member member);
}

package solid.backend.admin.travel.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import solid.backend.admin.travel.dto.TravelDto;
import solid.backend.admin.travel.dto.TravelSummaryDto;

import java.util.List;

public interface TravelRepository extends JpaRepository<TravelDto, Integer> {
    @Query("SELECT new solid.backend.admin.travel.dto.TravelSummaryDto(t.travelId, t.travelName, t.travelPrice, t.travelAmount) FROM travel t")
    List<TravelSummaryDto> findAllSummary();
}

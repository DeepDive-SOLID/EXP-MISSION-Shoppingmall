package solid.backend.admin.travel.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import solid.backend.admin.travel.repository.TravelRepository;
import solid.backend.admin.travel.dto.*;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class TravelServiceImpl implements TravelService {
    private final TravelRepository travelRepository;

    @Override
    public List<TravelDto> getTravelListAll() {
        return travelRepository.findAll();
    }

    @Override
    public List<TravelSummaryDto> getTravelList() {
        return travelRepository.findAllSummary();
    }

    @Override
    public void addTravel(AddTravelDto addTravelDto) {
        TravelDto travelDto = new TravelDto();

        travelDto.setTravelName(addTravelDto.getTravelName());
        travelDto.setTravelPrice(addTravelDto.getTravelPrice());
        travelDto.setTravelAmount(addTravelDto.getTravelAmount());
        travelDto.setTravelSold(addTravelDto.isTravelSold());
        travelDto.setTravelComment(addTravelDto.getTravelComment());
        travelDto.setTravelLabel(addTravelDto.getTravelLabel());
        travelDto.setTravelStartDt(addTravelDto.getTravelStartDt());
        travelDto.setTravelEndDt(addTravelDto.getTravelEndDt());
        travelDto.setTravelUploadDt(addTravelDto.getTravelUploadDt());
        travelDto.setTravelUpdateDt(addTravelDto.getTravelUpdateDt());
        travelDto.setTravelImg(addTravelDto.getTravelImg());

        travelRepository.save(travelDto);
    }

    @Override
    public void updateTravel(UpdateTravelDto updateTravelDto) {
        TravelDto travelDto = travelRepository.findById(updateTravelDto.getTravelId())
                .orElseThrow(() -> new IllegalArgumentException("해당 여행 상품이 존재하지 않습니다: id = " + updateTravelDto.getTravelId()));

        travelDto.setTravelName(updateTravelDto.getTravelName());
        travelDto.setTravelPrice(updateTravelDto.getTravelPrice());
        travelDto.setTravelAmount(updateTravelDto.getTravelAmount());
        travelDto.setTravelSold(updateTravelDto.isTravelSold());
        travelDto.setTravelComment(updateTravelDto.getTravelComment());
        travelDto.setTravelLabel(updateTravelDto.getTravelLabel());
        travelDto.setTravelStartDt(updateTravelDto.getTravelStartDt());
        travelDto.setTravelEndDt(updateTravelDto.getTravelEndDt());
        travelDto.setTravelUploadDt(updateTravelDto.getTravelUploadDt());
        travelDto.setTravelUpdateDt(updateTravelDto.getTravelUpdateDt());
        travelDto.setTravelImg(updateTravelDto.getTravelImg());

        travelRepository.save(travelDto);
    }

    @Override
    public void deleteTravel(DeleteTravelDto deleteTravelDto) {
        Integer id = deleteTravelDto.getTravelId();
        System.out.println(id);

        if(id == null)
            throw new IllegalArgumentException("삭제할 여행 상품이 없습니다.");
        if(!travelRepository.existsById(id))
            throw new IllegalArgumentException("해당 여행 상품이 존재하지 않습니다.");

        travelRepository.deleteById(id);
    }
}

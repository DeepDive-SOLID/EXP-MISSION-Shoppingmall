package solid.backend.admin.travel.service;

import solid.backend.admin.travel.dto.*;

import java.util.List;

public interface TravelService {

    List<TravelDto> getTravelListAll();
    List<TravelSummaryDto> getTravelList();
    void addTravel(AddTravelDto addTravelDto);
    void updateTravel(UpdateTravelDto updateTravelDto);
    void deleteTravel(DeleteTravelDto deleteTravelDto);
}

package solid.backend.admin.travel.service;

import solid.backend.admin.travel.dto.*;

import java.util.List;

public interface TravelService {

    /**
     * 설명: 여행 상품 정보 가져오기
     * @return List<TravelListDto>
     * */
    List<TravelListDto> getTravelList();

    /**
     * 설명: 모든 여행 상품 정보 가져오기
     * @return List<TravelListAllDto>
     * */
    List<TravelListAllDto> getTravelListAll();

    /**
     * 설명: 여행 상품 등록
     * @param travelAddDto
     * */
    void addTravelDto(TravelAddDto travelAddDto);

    /**
     * 설명: 여행 상품 수정
     * @param travelUpdDto
     * */
    void updTravelDto(TravelUpdDto travelUpdDto);

    /**
     * 설명: 여행 상품 삭제
     * @param travelId
     * */
    void delTravelDto(Integer travelId);
}

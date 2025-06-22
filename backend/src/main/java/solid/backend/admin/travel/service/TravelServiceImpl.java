package solid.backend.admin.travel.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import solid.backend.admin.travel.repository.TravelQueryRepository;
import solid.backend.jpaRepository.TravelRepository;
import solid.backend.admin.travel.dto.*;
import solid.backend.common.FileManager;
import solid.backend.entity.Travel;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TravelServiceImpl implements TravelService {

    private final TravelRepository travelRepository;
    private final TravelQueryRepository travelQueryRepository;
    private final FileManager fileManager;

    /**
     * 설명: 여행 상품 정보 가져오기
     * @return List<TravelListDto>
     * */
    @Override
    public List<TravelListDto> getTravelList() {
        return travelRepository.findAll().stream()
                .map(travel -> new TravelListDto(
                        travel.getTravelId(),
                        travel.getTravelName(),
                        travel.getTravelPrice(),
                        travel.getTravelAmount(),
                        travel.getTravelSold())).collect(Collectors.toList());
    }

    /**
     * 설명: 모든 여행 상품 정보 가져오기
     * @return List<TravelListAllDto>
     * */
    @Override
    public List<TravelListAllDto> getTravelListAll() {
        return travelRepository.findAll().stream()
                .map(travel -> new TravelListAllDto(
                        travel.getTravelId(),
                        travel.getTravelName(),
                        travel.getTravelPrice(),
                        travel.getTravelAmount(),
                        travel.getTravelSold(),
                        travel.getTravelComment(),
                        travel.getTravelLabel(),
                        travel.getTravelStartDt(),
                        travel.getTravelEndDt(),
                        travel.getTravelUploadDt(),
                        travel.getTravelUpdateDt(),
                        travel.getTravelImg())).collect(Collectors.toList());
    }

    /**
     * 설명: 여행 상품 검색
     * @param travelSearchDto
     * @return List<TravelListDto>
     * */
    @Override
    public List<TravelListDto> searchTravelList(TravelSearchDto travelSearchDto) {
        return travelQueryRepository.findTravel(travelSearchDto);
    }

    /**
     * 설명: 여행 상품 등록
     * @param travelAddDto
     * */
    @Override
    @Transactional
    public void addTravelDto(TravelAddDto travelAddDto) {
        Travel travel = new Travel();
        travel.setTravelName(travelAddDto.getTravelName());
        travel.setTravelPrice(travelAddDto.getTravelPrice());
        travel.setTravelAmount(travelAddDto.getTravelAmount());
        travel.setTravelSold(travelAddDto.getTravelSold());
        travel.setTravelComment(travelAddDto.getTravelComment());
        travel.setTravelLabel(travelAddDto.getTravelLabel());
        travel.setTravelStartDt(travelAddDto.getTravelStartDt());
        travel.setTravelEndDt(travelAddDto.getTravelEndDt());
        travel.setTravelUploadDt(travelAddDto.getTravelUploadDt());
        travel.setTravelUpdateDt(travelAddDto.getTravelUpdateDt());

        // 파일을 로컬 디렉토리에 저장
        String savedPath = fileManager.addFile(travelAddDto.getTravelImg(), "travel");
        if (savedPath != null) {
            travel.setTravelImg(savedPath);
        }

        travelRepository.save(travel);
    }

    /**
     * 설명: 여행 상품 수정
     * @param travelUpdDto
     * */
    @Override
    @Transactional
    public void updTravelDto(TravelUpdDto travelUpdDto) {
        Travel travel = travelRepository.findById(travelUpdDto.getTravelId())
                .orElseThrow(() -> new IllegalArgumentException("해당 여행 상품이 존재하지 않습니다: id = " + travelUpdDto.getTravelId()));

        travel.setTravelName(travelUpdDto.getTravelName());
        travel.setTravelPrice(travelUpdDto.getTravelPrice());
        travel.setTravelAmount(travelUpdDto.getTravelAmount());
        travel.setTravelSold(travelUpdDto.getTravelSold());
        travel.setTravelComment(travelUpdDto.getTravelComment());
        travel.setTravelLabel(travelUpdDto.getTravelLabel());
        travel.setTravelStartDt(travelUpdDto.getTravelStartDt());
        travel.setTravelEndDt(travelUpdDto.getTravelEndDt());
        travel.setTravelUpdateDt(travelUpdDto.getTravelUpdateDt());
        travel.setTravelImg(travelUpdDto.getTravelImg());

        travelRepository.save(travel);
    }

    /**
     * 설명: 여행 상품 삭제
     * @param travelId
     * */
    @Override
    @Transactional
    public void delTravelDto(Integer travelId) {
        if(travelId == null) throw new IllegalArgumentException("삭제할 여행 상품이 없습니다.");
        Travel travel = travelRepository.findById(travelId)
                .orElseThrow(() -> new IllegalArgumentException("해당 여행 상품이 존재하지 않습니다."));

        // 이미지 파일 삭제
        fileManager.deleteFile(travel.getTravelImg());

        travelRepository.deleteById(travelId);
    }
}

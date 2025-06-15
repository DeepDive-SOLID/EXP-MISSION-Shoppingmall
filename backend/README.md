# 프로젝트 디렉토리 구조
src/main/java/solid/backend

- admin : 관리자 페이지
  - travel : 여행 상품 관리
- entity : 엔티티
  - Auth : 권한
  - Member : 회원
  - Travel : 여행상품
  - Product : 물품
  - Orders : 주문
  - OrderTravel : 여행 주문
  - OrderProduct : 물품 주문
  - payment : 결제수단
  - Basket : 장바구니
  - Review : 리뷰
  - CompoundKey : 조합키
- config: 설정파일
  - QueryDsl: QueryDSL 빈 등록
  

## 사용자 관리 : admin/travel
- controller(컨트롤러)
    - TravelController.java
- dto(객체정보)
    - TravelAddDto.java
    - TravelListAllDto.java
    - TravelListDto.java
    - TravelSearchDto.java
    - TravelUpdDto.java
- repository(jpa)
    - TravelQueryRepository.java
    - TravelRepository.java
- service(비즈니스 로직)
    - TravelService.java
    - TravelServiceImpl.java

## API 목록
[조회]  
- HTTP method : GET  
- HTTP request URL : /admin/getTravelList 
- param : x  
- return : TravelListDto(List)

[전체 데이터 조회]
- HTTP method : GET  
- HTTP request URL : /admin/getTravelListAll
- param : x  
- return : TravelListDto(List)

[등록]
- HTTP method : POST
- HTTP request URL : /admin/travel/addTravel
- param : TravelAddDto(TravelDto)
- return : ResponseEntity(Stirng)

[수정]
- HTTP method : PUT
- HTTP request URL : /admin/travel/updateTravel
- param : TravelUpdDto(TravelDto)
- return : ResponseEntity(Stirng)

[삭제]
- HTTP method : DELETE
- HTTP request URL : /admin/travel/deleteTravel
- param : travelId(Integer)
- return : ResponseEntity(Stirng)

[검색]  
- HTTP method : GET  
- HTTP request URL : /admin/travel/search 
- param : TravelSearchDto 
- return : TravelListDto(List)

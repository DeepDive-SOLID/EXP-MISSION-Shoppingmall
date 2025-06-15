# 프로젝트 디렉토리 구조
src/main/java/solid/backend

- admin : 관리자 페이지
  - member : 사용자 관리
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
  

## 사용자 관리 : admin/member
- controller(컨트롤러)
    - MemberController.java
- dto(객체정보)
    - MemberListDto.java
    - MemberSearchDto.java
- repository(jpa)
    - MemberQueryRepository.java
    - MemberRepository.java
- service(비즈니스 로직)
    - MemberService.java
    - MemberServiceImpl.java

## API 목록
[조회]  
HTTP method : GET  
HTTP request URL : /admin/member 
param : x  
return : MemberListDto(List)

[검색]  
HTTP method : GET  
HTTP request URL : /admin/member/search 
param : MemberSearchDto 
return : MemberListDto(List)

# EXP-MISSION-Shoppingmall


# 프로젝트 디렉토리 구조
src/main/java/solid/backend

- admin : 관리자 페이지 
  - product : 물품관리
  - dashboard : 대시보드 관리
  - orders : 주문 관리
  - member : 
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

### 사용자 관리 : admin/member
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
- HTTP method : GET  
- HTTP request URL : /admin/member 
- param : x  
- return : MemberListDto(List)

[검색]  
- HTTP method : POST  
- HTTP request URL : /admin/member/search 
- param : MemberSearchDto 
- return : MemberListDto(List)

### 물품관리 : admin/product
- controller(컨트롤러)
    - ProductController.java
- dto(객체정보)
    - ProductListDto.java
    - ProductAddDto.java
    - ProductUpdateDto.java
    - ProductSearchDto.java
- repository(jpa)
    - ProductRepository.java
    - ProductQueryRepository.java
- service(비즈니스 로직)
    - ProductService.java
    - ProductServiceImpl.java

### 물품 CRUD API 목록
[조회]  
HTTP method : GET  
HTTP request URL : /admin/product/getProductList  
param : x  
return : ProductListDto(List)

[등록]  
HTTP method : POST  
HTTP request URL : /admin/product/addProductDto  
param : ProductAddDto(ProductDto)  
return : ResponseEntity(Stirng)

[수정]  
HTTP method : PUT  
HTTP request URL : /admin/product/updateProductDto  
param : ProductUpdDto(ProductDto)  
return : ResponseEntity(Stirng)

[삭제]  
HTTP method : DELETE  
HTTP request URL : /admin/product/deleteProductDto  
param : productId(int)  
return : ResponseEntity(Stirng)  

[검색]  
HTTP method : POST  
HTTP request URL : /admin/product/searchProductDto  
param : ProductSearchDto(ProductDto)  
return : ProductListDto(List)


### 대시보드 : admin/dashboard
- controller(컨트롤러)
    - DashboardController.java
- dto(객체정보)
    - DashboardCategoryStatsDto.java
    - DashboardMonthlyTxDto.java
    - DashboardProductStatsDto.java
    - DashboardWeeklySalesAmtDto.java
- repository(jpa)
    - DashboardQueryRepository.java
- service(비즈니스 로직)
    - DashboardService.java
    - DashboardServiceImpl.java

### 대시보드 조회 목록
[이번달 거래현황]  
HTTP method : GET  
HTTP request URL : /admin/dashboard/getDashboardMonthlyTxDto  
param : x  
return : DashboardMonthlyTxDto  

테이블에서 데이터 조회
- travel : 여행 상품  
- product : 물품  
- orders : 주문  
- order_travel : 여행 주문  
- order_product : 물품 주문  

이번달 날짜 조건 처리
- 오늘 날짜 (예: 2025-06-12) -> firstDayOfMonth : 2025-06-01, firstDayOfNextMonth : 2025-07-01
- LocalDate today = LocalDate.now();
- LocalDate firstDayOfMonth = today.withDayOfMonth(1);
- LocalDate firstDayOfNextMonth = firstDayOfMonth.plusMonths(1);
- 쿼리 : .where(orders.orderDt.goe(firstDayOfMonth).and(orders.orderDt.lt(firstDayOfNextMonth)))

조회 조건 및 테이블 조인 관계
- 총 거래 수 : orderProductAmount + orderTravelAmount  
- 거래 취소 수 : order_state = 1인 주문들의 orderProductAmount + orderTravelAmount  
- 거래 확정 수 : order_state = 1인 주문들을 제외한 orderProductAmount + orderTravelAmount  
- 총 매출 금액 : order_state = 1인 주문들을 제외한 orderProductAmount * productPrice + orderTravelAmount * travelPrice  

[현재 상품 현황]  
HTTP method : GET  
HTTP request URL : /admin/dashboard/getDashboardProductStatsDto  
param : x  
return : DashboardProductStatsDto

테이블에서 데이터 조회
- travel : 여행 상품  
- product : 물품  

조회 조건 및 테이블 조인 관계
- 총 상품, 물품 수 : travels + products
- 품절 상품, 물품 수 : travel_sold = true인 travels + product_sold = true인 products

[거래 물품 카테고리 통계]  
HTTP method : GET  
HTTP request URL : /admin/product/getDashboardCategoryStatsDto  
param : x
return : List< DashboardCategoryStatsDto >

테이블에서 데이터 조회
- orders : 주문
- product : 물품
- order_product : 물품 주문

조회 조건 및 테이블 조인 관계
- 모든 제품별 주문 수량 합계 조회 : products + orders + order_product

[이번 주 거래 금액 통계]  
HTTP method : GET  
HTTP request URL : /admin/product/getDashboardWeeklySalesAmtDto  
param : x
return : List< DashboardWeeklySalesAmtDto >

테이블에서 데이터 조회
- orders : 주문
- travel : 여행 상품
- product : 물품
- order_product : 물품 주문
- order_travel : 여행 주문

이번주 날짜 조건 처리
- 오늘 날짜 (예: 2025-06-13) -> firstDayOfMonth : 이번 주 월요일(2025-06-09), firstDayOfNextMonth : 2025-06-15(이번 주 일요일)
- LocalDate today = LocalDate.now();
- LocalDate monday = today.with(DayOfWeek.MONDAY);
- LocalDate sunday = monday.plusDays(6);
- 쿼리 : .where(orders.orderDt.between(monday, sunday).and(orders.orderState.ne(1)))

조회 조건 및 테이블 조인 관계
- 여행상품, 물품 기준 일별 총 금액 : order_state = 1인 주문을 제외한 orderProductAmount * productPrice + orderTravelAmount * travelPrice

---
## 주문 관리
/admin/orders

### Controller
- OrdersController
### Dto 
- OrdersManagementDto ( 주문 관리 조회 )
- OrdersSearchDto ( 주문 관리 검색 )
### Repository
- OrdersQueryRepository ( QueryDSL Repository )
### Service
- OrdersService ( Service Interface )
- OrdersServiceImpl ( Service 구현 클래스 )
---
## 주문 관리
## Return 데이터 값
### [데이터 구조]
- orderId: Integer,
- travelName: String,
- productName: String,
- memberId: String,
- paymentName: String,
- orderTravelAmount: Integer,
- orderProductAmount: Integer,
- orderDt: LocalDate,
- orderState: Integer

### [전체 조회] 
- HTTP Method: GET
- HTTP URL: /admin/orders/list
- Params: X
- return: List\<OrdersManagementDto\>
- 테이블 조인 관계: orders + orderTravels + orderProducts + travel + product

### [검색]
- HTTP Method: POST
- HTTP URL: /admin/orders/search
- RequestBody Param: OrdersSearchDto
- return: List\<OrdersManagementDto\>
- 테이블 조인 관계: orders + orderTravels + orderProducts + travel + product

# EXP-MISSION-Shoppingmall


# 프로젝트 디렉토리 구조
src/main/java/solid/backend

- admin : 관리자 페이지 
  - product : 물품관리
  - dashboard : 대시보드 관리
  - orders : 주문 관리
  - member : 사용자 관리
  - travel : 여행 상품 관리
- mypage : 회원 페이지
  - member : 회원 관리
  - orders : 주문 내역 관리
  - payment : 결제수단 관리
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
  - FileStorageConfig : 파일 설정 값 관리
  - FileStorageHandlerConfig : 업로드 파일에 대한 정적 리소스 핸들링 설정
- common : 공통 기능
  - FileManager : 파일 관리 모듈
- jpaRepository : JPA Repository
  - AuthRepository : 권한
  - BasketRepository : 장바구니
  - MemberRepository : 회원
  - OrderProductRepository : 물품 주문
  - OrdersRepository : 주문
  - OrderTravelRepository : 여행 주문
  - PaymentRepository : 결제수단
  - ProductRepository : 물품
  - ReviewRepository : 리뷰
  - TravelRepository : 여행상품
---
### 사용자 관리 : admin/member
- controller(컨트롤러)
    - MemberController.java
- dto(객체정보)
    - MemberListDto.java
    - MemberSearchDto.java
    - MemberUpdDto.java
- repository(jpa)
    - MemberQueryRepository.java
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

[권한 변경]
- HTTP method : PUT  
- HTTP request URL : /admin/member/updateAuth
- param : MemberUpdDto
- return : ResponseEntity<String>
---
### 물품관리 : admin/product
- controller(컨트롤러)
    - ProductController.java
- dto(객체정보)
    - ProductListDto.java
    - ProductAddDto.java
    - ProductUpdateDto.java
    - ProductSearchDto.java
- repository(jpa)
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
---

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
- 오늘 날짜 (예: 2025-06-13) -> monday : 6일 전(2025-06-07), sunday : 오늘(2025-06-13)
- LocalDate today = LocalDate.now();
- LocalDate startDt = today.minusDays(6);
- LocalDate endDt = today;
- 쿼리 : .where(orders.orderDt.between(startDt, endDt).and(orders.orderState.ne(1)))

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

### [상태 수정]
- HTTP Method: PUT
- HTTP URL: /admin/orders/updateOrderState
- RequestBody Param: OrdersUpdateDto
- return: List\<OrdersManagementDto\>
---
## 여행 상품 관리 : admin/travel
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
- HTTP method : POST
- HTTP request URL : /admin/travel/search
- param : TravelSearchDto
- return : TravelListDto(List)

---

### 주문 내역 관리 : mypage/orders
- controller(컨트롤러)
  - MypageOrdersController.java
- dto(객체정보)
  - MypageOrdersListDto.java
  - MypageOrdersProductListDto.java
  - MypageOrdersReviewAddDto.java
  - MypageOrdersReviewDto.java
  - MyPageOrdersReviewIdDto.java
  - MypageOrdersReviewUpdDto.java
  - MypageOrdersTravelListDto.java
  - MypageOrdersUpdDto.java
- repository(jpa)
  - MypageOrdersQueryRepository.java
- service(비즈니스 로직)
  - MypageOrdersService.java
  - MypageOrdersServiceImpl.java

### 주문 내역 API 목록
[주문 내역 리스트 조회]  
HTTP method : POST  
HTTP request URL : /mypage/orders/getOrdersList    
param : memberId(String)  
return : MypageOrdersListDto(List)

[예약 취소]  
HTTP method : PUT  
HTTP request URL : /mypage/orders/updOrdersCancel  
param : MypageOrdersUpdDto(ordersDto)  
return : ResponseEntity(String)

[리뷰 정보 추가]  
HTTP method : POST  
HTTP request URL : /mypage/orders/addOrdersReviewDto  
param : MypageOrdersReviewDto(reviewDto)  
return : ResponseEntity(String)

[리뷰 정보 조회]  
HTTP method : POST  
HTTP request URL : /mypage/orders/getOrdersReviewDto  
param : MypageOrdersReviewIdDto(reviewIds)  
return : MypageOrdersReviewDto

[리뷰 정보 수정]  
HTTP method : PUT  
HTTP request URL : /mypage/orders/updOrdersReviewDto  
param : MypageOrdersReviewUpdDto(reviewDto)  
return : ResponseEntity(String)
---

### 회원 정보 관리 : mypage/member
- controller(컨트롤러)
  - MypageMemberController.java
- dto(객체정보)
  - MypageMemberProfileDto.java
  - MypageMemberDto.java
  - MypageMemberUpdDto.java
- repository(jpa)
- service(비즈니스 로직)
  - MypageMemberService.java
  - MypageMemberServiceImpl.java

### 회원 정보 API 목록
[회원 정보 조회]  
HTTP method : POST  
HTTP request URL : /mypage/member/getProfileDto    
param : memberId(String)  
return : MypageMemberProfileDto

[회원 정보 조회]  
HTTP method : POST  
HTTP request URL : /mypage/member/getMemberDto  
param : memberId(String)  
return : MypageMemberDto  

[회원 정보 수정]  
HTTP method : PUT  
HTTP request URL : /mypage/member/updateMemberDto    
param : memberDto(MypageMemberUpdDto)  
return : ResponseEntity(String)  

[회원 정보 이메일 중복 체크]
HTTP method : POST  
HTTP request URL : /mypage/member/checkEmail    
param : memberEmail(String)  
return : ResponseEntity(Boolean)

[회원 정보 삭제]  
HTTP method : DELETE  
HTTP request URL : /mypage/member/deleteMemberDto  
param : memberId(String)
return : ResponseEntity(String)
---

### 결제 수단 관리 : mypage/payment
- controller(컨트롤러)
  - PaymentController.java
- dto(객체정보)
  - PaymentAddDto.java
  - PaymentListDto.java
  - MypageMemberUpdDto.java
- repository(jpa)
  - PaymentQueryRepository.java
- service(비즈니스 로직)
  - PaymentService.java
  - PaymentServiceImpl.java

### 결제 수단 정보 API 목록
[조회]  
HTTP method : POST  
HTTP request URL : /mypage/payment/getPaymentList    
param : memberId(String)  
return : PaymentListDto(List)

[카드 이미지 조회]  
HTTP method : POST  
HTTP request URL : /mypage/payment/getCardImg  
param : cardId(Integer)  
return : String  

[등록]  
HTTP method : POST  
HTTP request URL : /mypage/member/addPaymentDto    
param : paymentDto(PaymentAddDto)  
return : ResponseEntity(String)

[삭제]  
HTTP method : DELETE  
HTTP request URL : /mypage/member/deletePaymentDto  
param : paymentId(Integer)  
return : ResponseEntity(String)
---
# EXP-MISSION-Shoppingmall

## 프로젝트 디렉토리 구조
src/main/java/solid/backend

- admin : 관리자 페이지
  - product : 물품관리
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
- config : 설정 파일  
  - QueryDSLConfig : QueryDSL 빈 등록
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
- HTTP Method: GET
- HTTP URL: /admin/orders/search
- RequestBody Param: OrdersSearchDto
- return: List\<OrdersManagementDto\>
- 테이블 조인 관계: orders + orderTravels + orderProducts + travel + product
- 해당 하는 검색 조건
```java
    /**
     * 설명 : 물품 Id 검색
     * @param ordersId
     * @return BooleanExpression
     */
    private BooleanExpression eqOrdersId(Integer ordersId) {
        return (ordersId != null) ? QOrders.orders.ordersId.eq(ordersId) : null;
    }

    /**
     * 설명 : 물품 이름 검색
     * @param productName
     * @return BooleanExpression
     */
    private BooleanExpression containsProductName(String productName) {
        return (productName != null) ? QProduct.product.productName.contains(productName) : null;
    }

    /**
     * 설명 : 유저 아이디 검색
     * @param memberId
     * @return BooleanExpression
     */
    private BooleanExpression eqMemberId(String memberId) {
        return (memberId != null) ? QOrders.orders.member.memberId.eq(memberId) : null;
    }
    /**
     * 설명 : 결제 수단 이름 검색
     * @param paymentName
     * @return BooleanExpression
     */
    private BooleanExpression containsPaymentName(String paymentName) {
        return (paymentName != null) ? QOrders.orders.payment.paymentName.contains(paymentName) : null;
    }

    /**
     * 설명 : 주문 날짜 검색
     * @param orderDt
     * @return BooleanExpression
     */
    private BooleanExpression eqOrderDt(LocalDate orderDt) {
        return (orderDt != null) ? QOrders.orders.orderDt.eq(orderDt) : null;
    }

    /**
     * 설명 : 주문 상태 검색
     * @param orderState
     * @return BooleanExpression
     */
    private BooleanExpression eqOrderState (Integer orderState) {
        return (orderState != null) ? QOrders.orders.orderState.eq(orderState) : null;
    }
```






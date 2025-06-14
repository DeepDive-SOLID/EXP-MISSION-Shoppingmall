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
- where 절
```java
private BooleanBuilder addSearchCondition(Map<String, String> search) {
        BooleanBuilder builder = new BooleanBuilder();

        search.forEach((key, value) -> {
            if (StringUtils.hasText(value)) {
                if (key.contains("orderId")) {
                    builder.and(orders.ordersId.eq(Integer.parseInt(value)));
                } else if (key.contains("orderDt")) {
                    builder.and(orders.orderDt.eq(LocalDate.parse(value)));
                } else if (key.contains("orderState")) {
                    builder.and(orders.orderState.eq(Integer.parseInt(value)));
                } else if (key.contains("memberId")) {
                    builder.and(orders.member.memberId.eq(value));
                } else if (key.contains("productName")) {
                    builder.and(product.productName.contains(value));
                } else if (key.contains("travelId")) {
                    builder.and(travel.travelId.eq(Integer.parseInt(value)));
                }
            }
        });
        return builder;
    }
```

[Param JSON 데이터 구조]
- Integer number: 1-7번까지 해당 하는 검색 카테고리 (카테고리는 더 추가/삭제 가능함)
- String data: input 데이터

[검색 분기 처리]
```java
    public List<OrdersManagementDto> findSearchOrdersList(OrdersSearchDto request) {
        Map<String, String> map = new HashMap<>();

        String result = switch (request.getNumber()) {
            case 1 -> "orderId";
            case 2 -> "orderDt";
            case 3 -> "orderState";
            case 4 -> "memberId";
            case 5 -> "productName";
            case 6 -> "";
            default -> "travelId";
        };
        map.put(result, request.getData());

        return ordersQueryRepository.findSearchOrdersList(map);
    }
```





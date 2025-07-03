# 결제 & 장바구니
- controller(컨트롤러)
    - BasketController.java
- dto (객체)
    - BasketAddDto.java
    - BasketDeleteDto.java
    - BasketListDto.java
    - BasketMemberDto.java
    - BasketProductDto.java
- repository(QueryDsl)
    - BasketQueryRepository.java
- service(서비스)
    - BasketService.java
    - BasketServiceImpl.java

# API 목록
## 장바구니
[장바구니에서 결제 화면 넘어갈 때]
- HTTP Method:GET
- HTTP URL: /payment/basket/order
- param: basketId
- return: BasketListDto

[저장]
- HTTP Method:POST
- HTTP URL: /payment/basket/save
- param: BasketAddDto
- return: ResponseEntity\<String>

[삭제]
- HTTP Method: DELETE
- HTTP URL: /payment/basket/delete
- param: BasketDeleteDto
- return ResponseEntity\<String>

[유저 장바구니 리스트]
- HTTP Method: POST
- HTTP URL: /payment/basket/list
- param: BasketMemberDto
- return List\<BasketListDto>

## 결제창
[저장]
- HTTP Method: POST
- HTTP URL: /payment/save
- param: OrderAddDto
- return ResponseEntity\<String>

[유저 카드 정보]
- HTTP Method: POST
- HTTP URL: /payment/cardInfo
- param: MemberDto
- return List\<PaymentCardDto>

[카드 저장]
- HTTP Method: POST
- HTTP URL: /payment/addCard
- param: PaymentCardAddDto
- return ResponseEntity\<String>

[유저 정보]
- HTTP Method: POST
- HTTP URL: /payment/memberInfo
- param: MemberDto
- return OrderMemberDto
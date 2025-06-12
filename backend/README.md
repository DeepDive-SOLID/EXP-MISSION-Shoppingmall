# EXP-MISSION-Shoppingmall

# 프로젝트 디렉토리 구조
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
  

### 물품관리 : admin/product
- controller(컨트롤러)
    - ProductController.java
- dto(객체정보)
    - ProductListDto.java
    - ProductAddDto.java
    - ProductUpdateDto.java
- repository(jpa)
    - ProductRepository.java
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
HTTP method : POST  
HTTP request URL : /admin/product/updateProductDto  
param : ProductUpdDto(ProductDto)  
return : ResponseEntity(Stirng)

[삭제]  
HTTP method : POST  
HTTP request URL : /admin/product/deleteProductDto  
param : productId(int)  
return : ResponseEntity(Stirng)  
# 홈화면: main
- controller(컨트롤러)
  - HomeController.java
- dto (객체)
  - HomeDetailDto.java
  - HomeReviewDto.java
  - HomeSearchDto.java
  - HomeTravelDto.java
- repository(QueryDsl)
  - HomeQueryRepository.java
- service(서비스)
  - HomeService.java
  - HomeServiceImpl.java

# API 목록
[홈 화면]
- HTTP Method:GET
- HTTP URL: /home/list
- param: x
- return: List\<travel>

[검색]
- HTTP Method:Post
- HTTP URL: /home/search
- param: HomeSearchDto
- return: List\<HomeTravelDto>

[상세 페이지]
- HTTP Method: GET
- HTTP URL: /home/detail-page
- param: travelId
- return HomeDetailDto
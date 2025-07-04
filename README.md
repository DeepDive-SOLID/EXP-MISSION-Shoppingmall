# EXP-MISSION-ShoppingMall

### 프로젝트 소개
- EXP 미션 3개(쇼핑몰, 여행 상품 판매 서비스, 회원 관리 서비스)를 통합하여 하나의 프로젝트로 진행하였습니다.
- 여행 상품 판매 쇼핑몰 웹 개발을 목표로 크게 관리자 페이지, 메인 페이지로 분할하여 기능을 나눴습니다.

<br>

### 팀원
<div align="center">
    <table>
    <tr>
      <th>BE</td>
      <th>FE</td>
      <th>BE</td>
      <th>FE</td>
      <th>BE</td>
    </tr>
    <tr>
      <td><p align="center"><img class="avatar avatar-user" src="https://avatars.githubusercontent.com/u/194752198?s=96&amp;v=4" width="48" height="48" alt="@w-jins"></td>
      <td><p align="center"><img class="avatar avatar-user" src="https://avatars.githubusercontent.com/u/160034314?s=96&amp;v=4" width="48" height="48" alt="@lnylnylnylny"></td>
      <td><p align="center"><img class="avatar avatar-user" src="https://avatars.githubusercontent.com/u/89690794?s=96&amp;v=4" width="48" height="48" alt="@koyulim"></td>
      <td><p align="center"><img class="avatar avatar-user" src="https://avatars.githubusercontent.com/u/143973893?s=96&amp;v=4" width="48" height="48" alt="@dyoni2"></td>
      <td><p align="center"><img class="avatar avatar-user" src="https://avatars.githubusercontent.com/u/57864253?s=96&amp;v=4" width="48" height="48" alt="@shinyyseon"></td>
    </tr>
    <tr>
      <td>김우진<br>@w-jins</td>
      <td>이나영<br>@lnylnylnylny</td>
      <td>고유림<br>@koyulim</td>
      <td>정지연<br>@dyoni2</td>
      <td>신용선<br>@shinyyseon</td>
  </table>
</div>

<br>

---

### 기술 스택
<table>
  <tr>
    <td><strong>FrontEnd</strong></td>
    <td>
      <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">
      <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white">
      <img src="https://img.shields.io/badge/Scss-CC6699?style=for-the-badge&logo=Sass&logoColor=white">
      <img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">
      <img src="https://img.shields.io/badge/reacthookform-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white">
      <img src="https://img.shields.io/badge/reactrouter-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white">
    </td>
  </tr>
  <tr>
    <td><strong>BackEnd</strong></td>
    <td>
      <img src="https://img.shields.io/badge/java-007396?style=for-the-badge&logo=OpenJDK&logoColor=white"> 
      <img src="https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=Spring&logoColor=white">
      <img src="https://img.shields.io/badge/spring boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white">
      <img src="https://img.shields.io/badge/spring security-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white">
      <img src="https://img.shields.io/badge/H2 Database-09476B?style=for-the-badge&logo=H2Database&logoColor=white">
    </td>
  </tr>
  <tr>
    <td><strong>Tools</strong></td>
    <td>
      <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
      <img src="https://img.shields.io/badge/intellij%20idea-000000.svg?&style=for-the-badge&logo=intellij%20idea&logoColor=white" />
      <img src="https://img.shields.io/badge/Visual%20Studio%20Code-007ACC.svg?&style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white"/>
      <img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white">
      <img src="https://img.shields.io/badge/Drawio-F08705?style=for-the-badge&logo=diagramsdotnet&logoColor=white">
      <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=Figma&logoColor=white">
      <img src="https://img.shields.io/badge/discord-5865F2?style=for-the-badge&logo=discord&logoColor=white">
      <img src="https://img.shields.io/badge/ERDCloud-000000?style=for-the-badge">
    </td>
  </tr>
</table>

---

### 주요 기능
1. 회원 관리
    - 회원가입 : 회원 정보 입력 후 DB 저장
    - 로그인 : DB 데이터와 입력 데이터 비교 후 로그인
    - 아이디 찾기 & 비밀번호 재설정 : DB 데이터와 입력 데이터 비교 후 아이디 조회, 비밀번호의 경우 재설정 페이지로 이동
2. 관리자 페이지
    - 대시보드 : 사용자가 구매한 상품 데이터를 기반으로 통계 자료로 표시
    - 주문 관리 : 사용자가 구매한 상품의 정보 및 상태 표시
    - 사용자 관리 : 가입한 사용자 목록 표시
    - 상품 관리 (물품 관리, 여행 상품 관리) : 등록된 물품, 상품 표시
3. 메인 페이지
    - 메인 (검색, 헤더)
    - 상품 상세 페이지 : 원하는 상품 클릭 시 해당 상품의 상세 정보 표시
4. 마이 페이지
    - 주문내역 조회 : 사용자가 구매한 상품의 내역 및 주문 상태 표시
    - 카드 정보 관리 : 등록한 카드 정보 확인 및 카드 등록 가능
    - 회원 정보 수정 및 회원 탈퇴 : 회원가입 시 등록한 정보 수정 가능 및 회원 탈퇴
5. 결제 페이지
    - 장바구니 : 여행 상품 및 물품 장바구니
    - 주문 : 여행 상품 구매
    - 카드 등록 : 사용자의 카드 등록
    - 결제 : 등록된 카드를 이용하여 결제 진행
6. 사용자 인증 및 보안 기능
    - JWT : 토큰 발급, 검증, 재발급
    - Spring Security : 권한에 따라 접근할 수 있도록 설정, 암호화
    - AES : AES 암호화, 복호화
7. 이미지 첨부 기능
    - 이미지 정보 추가 및 삭제 : 로컬 디렉토리에 있는 이미지 추가 및 삭제
    - 이미지 경로 커스텀 : 로컬 디렉토리 경로 핸들링

---

### 사용 가이드
- 메인 페이지는 로그인을 하지 않아도 사용 가능합니다. 단 상품 구매를 원하는 경우 로그인 또는 회원가입이 필요합니다.

사용자
1. 회원가입 로그인
    1) 서비스 접속
    2) 회원가입 버튼 클릭
    3) 사용자 정보 입력
    4) 가입하기 버튼 클릭
    5) 생성된 계정으로 로그인

2. 원하는 여행 상품 검색
    1) 검색창에 원하는 키워드 또는 일정, 인원으로 검색
    2) 여행 상품 필터로 정렬가능 (최신순, 인기순, 평점순)
    3) 원하는 여행 상품 클릭

3. 여행 상품 구매 및 장바구니
    1) 원하는 여행 상품 클릭
    2) 여행 상품 상세보기에서 인원 수, 추가 물품 선택
    3) 장바구니 또는 예약하기 버튼 클릭 (장바구니 클릭 시 장바구니 페이지로 이동, 예약하기 버튼 클릭 시 주문 페이지로 이동)

4. 주문 페이지
    1) 이용 약관 동의 버튼 클릭
    2) 주소 등 여행자 정보 기입
    3) 카드 선택 또는 카드 등록
    4) 결제하기 버튼 클릭

5. 결제 페이지
    1) 결제 완료: 여행 정보, 날짜, 인원, 추가 구매 상품, 금액의 정보를 보여줌
    2) 결제 실패: 에러 메세지와 함께 결제하러 가기 버튼 활성화, 클릭 시 4번으로 이동

6. 마이페이지
    1) 마이페이지 버튼 클릭
    2) 주문 내역 조회에서 상품 주문 내역 확인 가능, 주문 완료된 리뷰 작성 가능
    3) 카드 정보 관리 클릭
    4) 등록된 카드 정보 확인, 카드 등록
    5) 회원 정보 수정 클릭
    6) 등록된 회원 정보 수정, 회원 탈퇴

관리자
1. 로그인
    1) 관리자 계정 아이디, 비밀번호 입력
    2) 로그인 클릭
    3) 메인 페이지로 이동
2. 메인 페이지
    1) 등록한 상품 확인 가능
    2) 상품 클릭 시 상세 정보로 등록한 데이터 확인 가능

3. 관리자 페이지
    1) 메인 페이지 관리자 대시보드 버튼 클릭
    2) 대시보드 : 이번달 거래 현황, 거래 물품 카테고리 통계, 현재 상품 현황, 주간 거리 금액 통계 확인 가능
    3) 주문관리 : 사용자가 주문한 상품 확인 가능, 주문 상태 변경 가능
    4) 사용자관리 : 서비스에 가입한 사용자 정보 확인 가능, 사용자 권한 변경 가능
    5) 상품관리 - 물품 관리 : 여행 상품 추가 물품 등록 및 정보 수정, 삭제 가능
    6) 상품관리 - 물품 관리 : 여행 상품 등록 및 정보 수정, 삭제 가능


### 초기 설계

| 로그인 | 홈 |
|:-------------:|:-------------:|
| ![image 2](https://github.com/user-attachments/assets/e9f5d781-816c-4742-8afc-ccfcdd7882de) | ![image 3](https://github.com/user-attachments/assets/6cd217c8-eed4-4b85-a326-a2f471368b7b) |
| 상세페이지 & 주문페이지 | 마이페이지 |
|![image 4](https://github.com/user-attachments/assets/e57e3538-6d5b-4ae1-aaca-0ca5febce6e1)| ![image 5](https://github.com/user-attachments/assets/a37e3bb4-aa5c-4248-9426-5ebd273387ad) |
| 관리자 페이지 |
| ![image 6](https://github.com/user-attachments/assets/b0f85176-cb0c-4037-91c0-a19ca2b3843d) |


![image 7](https://github.com/user-attachments/assets/84da0a81-f4e7-4b6b-bbb5-24f995b00e80)

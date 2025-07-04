# 🛍️ EXP-MISSION-Shoppingmall

## 📦 실행 방법

```bash
// 프로젝트 디렉토리로 이동
cd frontend

// 의존성 설치
npm i

// 개발 서버 실행
npm run dev
```

## 🛠️ 기술 스택

| 구분       | 기술                      |
| ---------- | ------------------------- |
| 프레임워크 | React (Vite)              |
| 언어       | TypeScript                |
| 스타일     | SCSS                      |
| API 통신   | Axios                     |
| 폼 관리    | react-hook-form           |
| 라우팅     | React Router DOM          |
| 인증 처리  | jwt-decode                |
| 주소 검색  | react-daum-postcode       |
| 슬라이더   | Swiper                    |
| 시각화     | chart.js, react-chartjs-2 |
| 아이콘     | react-icons               |
| 협업 도구  | GitHub, Figma             |
| 코드 규칙  | ESLint, Prettier          |

## 📁 프로젝트 폴더 구조

/src

- api/
  - admin/ → 관리자 페이지 관련 API 요청 정의
    - dashboardApi.ts → 대시보드 API
    - memberApi.ts → 사용자 관리 API
    - orderApi.ts → 주문 관리 API
    - productApi.ts → 물품 관리 API
    - travelApi.ts → 여행 상품 관리 API
  - basket/ → 장바구니 관련 API 요청 정의
    - basketApi.ts → 장바구니 API
  - home/ → 홈화면 관련 API 요청 정의
    - homeApi.ts → 홈화면 API
  - login/ → 로그인 관련 API 요청 정의
    - authApi.ts → 로그인 API
  - mypage/ → 마이페이지 관련 API 요청 정의
    - cardApi.ts → 마이페이지 카드 관리 API
    - memberApi.ts → 마이페이지 사용자 정보 API
    - orderApi.ts → 마이페이지 주문 내역 API
  - order/ → 주문 관련 API 요청 정의
    - orderApi.ts → 주문 API
  - axios.ts → Axios 인스턴스 공통 설정
  - index.ts → API 요청 정의를 모듈화하여 export하는 인덱스 파일
- assets/

  - icons/ → 전역 아이콘 파일
  - images/ → 정적 이미지 리소스
  - index.ts → asset export용 인덱스 파일

- components/

  - common/ → 공통 컴포넌트

    - Header/ → 공통 헤더 UI 컴포넌트
    - Header_dash/ → 관리자 대시보드 전용 헤더 UI 컴포넌트
    - Sidebar/ → 공통 사이드바 UI 컴포넌트
    - Sidebar_mypage/ → 마이페이지 전용 사이드바 UI 컴포넌트
    - Footer/ → 공통 푸터 UI 컴포넌트
    - CounterBox/ → 카운터 박스 컴포넌트
    - ProtectedRoute.tsx → 인증된 사용자만 접근 가능한 라우트 컴포넌트

  - dashboard/ → 관리자 대시보드 구성 컴포넌트
    - CategoryStatistics/ → 거래물품 카테고리
    - CurrentProductStatus/ → 현재 상품 현황
    - MainDashboard/ → 메인 대시보드
    - MonthlyTransaction/ → 이번달 거래 현황
    - WeeklySalesAmount/ → 주간 거래 금액 통계
  - detail/ → 상세 페이지 관련 컴포넌트

    - Info/ → 상세 페이지 정보
    - ProductImg/ → 상세 페이지 별 이미지
    - Review/ → 상세 페이지 별 리뷰

  - home/ → 홈화면 구성 컴포넌트

    - HomeBanner/ → 홈화면 배너
    - HomeDeadline/ → 홈화면 마감 임박 상품
    - HomePopular/ → 홈화면 인기 상품
    - HomeRecommend/ → 홈화면 추천 상품

  - order/ → 주문 관련 컴포넌트
    - AddCard/ → 카드 추가
    - OrderAgreement/ → 주문 약관
    - OrderPayment/ → 주문 결제
    - OrderProduct/ → 주문 상품
  - search/ → 검색 관련 컴포넌트
    - SearchMain/ → 검색 메인
    - SearchSidebar/ → 검색 사이드바

- contexts/ → 전역 상태 관리 컨텍스트

  - AuthContext.tsx → 인증 관련 전역 상태 관리 컨텍스트

- pages/

  - admin/ → 관리자 페이지

    - dashboard/ → 대시보드 페이지
    - manageOrder/ → 주문관리 페이지
    - manageProduct/ → 물품관리 페이지
    - manageTravel/ → 여행 상품관리 페이지
    - manageUser/ → 사용자관리 페이지

  - cart/ → 장바구니 페이지

    - Cart.tsx → 장바구니 페이지
    - Cart.module.scss → 장바구니 페이지 스타일

  - detail/ → 상세 페이지

    - Detail.tsx → 상세 페이지
    - Detail.module.scss → 상세 페이지 스타일

  - home/ → 홈화면 페이지
    - Home.tsx → 홈화면 페이지
  - login/ → 로그인 페이지
    - findPw/ → 비밀번호 찾기 페이지
    - signUp/ → 회원가입 페이지
    - signIn/ → 로그인 페이지
  - mypage/ → 마이페이지

    - cardInfo/ → 카드 정보 페이지

      - addComplete/ → 카드 추가 완료 페이지
      - addFail/ → 카드 추가 실패 페이지
      - cardAdd/ → 카드 추가 페이지
      - cardInfo/ → 카드 정보 페이지

    - editProfile/ → 프로필 수정 페이지
    - orderList/ → 주문 내역 페이지

  - payresult/ → 결제 결과 페이지
    - PaySuccess.tsx → 결제 성공페이지
    - PayFail.tsx → 결제 실패 페이지
    - PayResult.module.scss → 결제 결과 페이지 스타일
  - search/ → 검색 페이지
    - Search.tsx → 검색 페이지

- types/

  - admin/ → 관리자 페이지 타입 정의
    - dashboard.ts → 대시보드 타입 정의
    - order.ts → 주문 타입 정의
    - product.ts → 물품 타입 정의
    - travel.ts → 여행상품 타입 정의
    - user.ts → 사용자 타입 정의
  - basket/ → 장바구니 타입 정의
    - basket.ts
  - home/ → 홈화면 타입 정의
    - homeProduct.ts → 홈화면 상품 타입 정의
    - homeSearch.ts → 홈화면 검색 타입 정의
    - homeTravel.ts → 홈화면 여행 상품 타입 정의
    - review.ts → 리뷰 타입 정의
  - login/ → 로그인 타입 정의
    - auth.ts
  - mypage/ → 마이페이지 타입 정의
    - card.ts → 카드 타입 정의
    - member.ts → 사용자 타입 정의
    - order.ts → 주문 타입 정의
  - order/ → 주문 타입 정의
    - order.ts

- utils/

  - auth.ts → 인증 관련 유틸 함수
  - delay.ts → 지정된 시간만큼 지연시키는 Promise 반환 함수
  - formatDate.ts → 날짜 문자열을 YYYY-MM-DD 형식으로 변환하는 함수, 오늘 날짜 반환
  - orderUtils.ts → 주문 상태에 따른 텍스트 및 CSS 클래스 반환
  - transformProduct.ts → API 응답 데이터를 Product 타입으로 변환
  - travelUtils.ts → 여행 상품 변환, 검색 파라미터 생성, 페이지네이션 계산 등 유틸 함수

- App.tsx → 라우터 Outlet을 포함한 루트 컴포넌트

- main.tsx → 앱 진입점, 라우터 설정 및 렌더링
- vite.config.js → 프록시 설정 및 빌드 설정을 포함한 Vite 설정 파일

## 📺 화면 별 기능

### 대시보드

![image](https://github.com/user-attachments/assets/785437ff-439d-43df-9fee-408741b34283)

### 주문 관리 페이지

![image](https://github.com/user-attachments/assets/588a058f-be46-48c6-9dd1-8e4d680e8ffe)

### 사용자 관리 페이지

![image](https://github.com/user-attachments/assets/7a9883b9-a87b-4a69-a385-9789b707670c)

### 물품 관리 페이지

![image](https://github.com/user-attachments/assets/6c17442d-43fb-4f0c-b19f-e3b9fcecff0d)
| 수정 | 삭제 |
|--------|---------|
|![image](https://github.com/user-attachments/assets/5b1c03c3-9eec-4890-bc64-6343280b75b9)|![image](https://github.com/user-attachments/assets/62a1bc5c-cc56-4a39-bcac-a997cdf06975)|

### 여행 상품 관리 페이지

![image](https://github.com/user-attachments/assets/f100ae54-5076-4ad1-8bc4-cf4f68610be8)
| 수정 | 삭제 |
|--------|---------|
|![image](https://github.com/user-attachments/assets/324e6f7e-9c05-43d5-988a-5d21c7b3bfc3)|![image](https://github.com/user-attachments/assets/71dd176b-bb0e-45b2-9eea-d431944b277d)|

### 추가 모달

| 물품 추가                                                                                 | 여행 상품 추가                                                                            |
| ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| ![image](https://github.com/user-attachments/assets/a7bb3189-bcef-4396-be99-65c14011993a) | ![image](https://github.com/user-attachments/assets/3110ca35-d2b5-4580-83cd-9583a9d5811b) |

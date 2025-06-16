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

| 구분         | 기술                             |
| ------------ | -------------------------------- |
| 프레임워크    | React (Vite)                     |
| 언어         | TypeScript                       |
| 스타일       | SCSS + 구름 모듈                 |
| 상태 관리     | Zustand                          |
| API 통신     | Axios                            |
| 폼 관리      | react-hook-form                  |
| 라우팅       | React Router DOM                 |
| 시각화       | chart.js, react-chartjs-2        |
| 아이콘       | react-icons                      |
| 협업 도구     | GitHub, Figma                    |
| 코드 규칙     | ESLint, Prettier                 |



## 📁 프로젝트 폴더 구조

/src
- api/
  - admin/  → 관리자 페이지 관련 API 요청 정의
    - dashboardApi.ts  → 대시보드 API
    - memberApi.ts  → 사용자 관리 API
    - orderApi.ts  → 주문 관리 API
    - productApi.ts  → 물품 관리 API
    - travelApi.ts  → 여행 상품 관리 API
  - axios.ts  → Axios 인스턴스 공통 설정
  
- assets/
  - icons/  → 전역 아이콘 파일
  - images/  → 정적 이미지 리소스
  - index.ts  → asset export용 인덱스 파일

- components/
  - common/  → 공통 컴포넌트
    - Header/  → 공통 헤더 UI 컴포넌트
    - Sidebar/  → 공통 사이드바 UI 컴포넌트

  - dashboard/  → 관리자 대시보드 구성 컴포넌트
    - CategoryStatistics/  → 거래물품 카테고리
    - CurrentProductStatus/  → 현재 상품 현황
    - MainDashboard/  → 메인 대시보드
    - MonthlyTransaction/  → 이번달 거래 현황
    - WeeklySalesAmount/  → 주간 거래 금액 통계

- pages/
  - admin/ → 관리자 페이지
    - dashboard/  → 대시보드 페이지
    - manageOrder/  → 주문관리 페이지
    - manageProduct/  → 물품관리 페이지
    - manageTravel/  → 여행 상품관리 페이지
    - manageUser/  → 사용자관리 페이지
  - home/ → 홈화면 페이지

- store/  → 전역 상태 관리 (Zustand 등 사용)

- types/
    - admin/  → 관리자 관련 TypeScript 타입 정의
      - dashboard.ts  → 대시보드 타입 정의
      - order.ts  → 주문 타입 정의
      - product.ts  → 물품 타입 정의
      - travel.ts  → 여행상품 타입 정의
      - user.ts  → 사용자 타입 정의

- utils/
  - delay.ts  → 지정된 시간만큼 지연시키는 Promise 반환 함수
  - formatDate.ts  → 날짜 문자열을 YYYY-MM-DD 형식으로 변환하는 함수, 오늘 날짜 반환
  - orderUtils.ts  → 주문 상태에 따른 텍스트 및 CSS 클래스 반환
  - productImg.ts  → 상품 이미지 리스트와 타입 정의
  - transformProduct.ts  → API 응답 데이터를 Product 타입으로 변환
  - travelUtils.ts  → 여행 상품 변환, 검색 파라미터 생성, 페이지네이션 계산 등 유틸 함수

- App.tsx  → 라우터 Outlet을 포함한 루트 컴포넌트

- main.tsx  → 앱 진입점, 라우터 설정 및 렌더링

## 📺 화면 별 기능

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

## 📁 프로젝트 폴더 구조

src/
├── api/
│ ├── admin/
│ │ └── [dashboardApi.ts, memberApi.ts, ...] # 관리자 페이지 관련 API 요청 정의
│ └── axios.ts # Axios 인스턴스 공통 설정
│
├── assets/
│ ├── icons/ # 프로젝트 전반에 사용하는 아이콘 파일
│ ├── images/ # 정적 이미지 파일
│ └── index.ts # asset export용 인덱스
│
├── components/
│ ├── common/
│ │ ├── Header/ # 공통 헤더 컴포넌트
│ │ └── Sidebar/ # 공통 사이드바 컴포넌트
│ └── dashboard/ # 관리자 대시보드 관련 컴포넌트
│ ├── CategoryStatistics/
│ ├── CurrentProductStatus/
│ ├── MainDashboard/
│ ├── MonthlyTransaction/
│ └── WeeklySalesAmount/
│
├── pages/
│ ├── admin/ # 관리자 관련 각 기능별 페이지
│ │ ├── dashboard/
│ │ ├── manageOrder/
│ │ ├── manageProduct/
│ │ ├── manageTravel/
│ │ └── manageUser/
│ └── home/ # 사용자 홈 페이지 관련
│
├── store/ # 전역 상태 관리 관련 ( Zustand )
│
├── types/
│ └── admin/ # 관리자 페이지 타입 정의
│ ├── dashboard.ts
│ ├── order.ts
│ ├── product.ts
│ ├── travel.ts
│ └── user.ts
│
├── utils/ # 공통 유틸 함수 모음
│ ├── delay.ts # 지정된 시간만큼 지연시키는 Promise 반환 함수
│ ├── formatDate.ts # 날짜 문자열을 YYYY-MM-DD 형식으로 변환하는 함수 및 오늘 날짜 반환 함수
│ ├── orderUtils.ts # 주문 상태에 따른 텍스트/스타일 클래스 반환 함수
│ ├── productImg.ts # 상품 이미지 리스트와 타입 정의
│ ├── transformProduct.ts # API 응답을 Product 타입으로 변환하는 함수
│ └── travelUtils.ts # 여행 상품 변환 및 검색/페이지네이션 유틸 함수
│
├── App.tsx # 라우터 Outlet을 포함한 루트 컴포넌트
└── main.tsx # 애플리케이션 진입점, 라우터 설정 및 렌더링

## 화면 별 기능

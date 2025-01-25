# ivory-next-log

### https://ivory-next-log.pages.dev/

**ivory-next-log**는 Next.js를 기반으로 제작된 프로젝트로, 사용자에게 개인 기록이나 글을 공유할 수 있는 블로그 템플릿을 제공합니다.

## 🌟 Features

- 최신 Next.js 기능 활용
- 서버 사이드 렌더링(SSR) 및 정적 사이트 생성(SSG) 지원
- 간결한 구조와 확장 가능한 설정
- 빠르고 효율적인 로컬 개발 환경

## 🚀 Getting Started

### 1. Clone the repository

```
git clone https://github.com/dev-khs/khs-log.git
```

### 2. Install dependencies

```
npm install
# or
yarn install
```

### 3. Setting Up Your Supabase Project

- [Supabase Instruction](src/supabase/README.md)

### 4. Run the development server

```
npm run dev
# or
yarn dev
```

## 📁 Project Structure

- FSD 아키텍처를 적용하여 기능별로 코드를 모듈화하고, 유지보수성과 확장성을 높였습니다.
- 공통 모듈(shared/)을 활용해 중복 코드를 줄이고, 코드의 재사용성을 극대화했습니다.

```
src/
├── app/                # 애플리케이션 루트 설정 및 초기화
├── features/           # 특정 기능에 활용되는 코드
│   ├── auth/
│   ├── comment/
│   ├── blog/
│   └── profile/
├── shared/             # 프로젝트 전반에서 재사용되는 공통 코드
│   ├── types/          # TypeScript 타입 정의
│   ├── constants/      # 프로젝트 상수 정의
│   ├── utils/          # 공통 유틸리티 함수
│   ├── components/     # 공통 UI 컴포넌트
│   └── hooks/          # 공통 커스텀 React Hook
├── supabase/           # Supabase 관련 설정
├── pages/              # 각 URL에 매핑되는 페이지
│   ├── BlogDetailPage/
│   ├── BlogDashBoardPage/
│   ├── BlogCreatePage/
│   ├── FavoritePage/
│   ├── BlogPage/
│   └── MainPage/
├── widgets/            # 독립적인 UI 위젯
└── store/              # 전역 상태 관리 (Zustand)
```

## 📄 pages/ 디렉토리

`pages/` 디렉토리는 애플리케이션의 주요 라우트와 페이지 컴포넌트를 정의한 디렉토리입니다. 각 페이지는 별도의 폴더로 구성되어 있으며, UI와 로직이 명확히 분리되어 있습니다.

---

### 디렉토리 구조

```plaintext
pages/
├── BlogCreatePage/           # 블로그 생성 페이지
│   ├── index.tsx             # 페이지 컴포넌트
├── BlogDashBoardPage/        # 블로그 대시보드 페이지
│   ├── ui/                   # 대시보드 관련 UI 컴포넌트
│   └── index.tsx             # 페이지 컴포넌트
├── BlogDetailPage/           # 블로그 상세 페이지
│   ├── ui/                   # 상세 페이지 관련 UI 컴포넌트
│   └── index.tsx             # 페이지 컴포넌트
├── BlogPage/                 # 블로그 목록 페이지
│   ├── ui/                   # 목록 관련 UI 컴포넌트
│   └── index.tsx             # 페이지 컴포넌트
├── FavoritePage/             # 즐겨찾기 페이지
│   ├── ui/                   # 즐겨찾기 관련 UI 컴포넌트
│   └── index.tsx             # 페이지 컴포넌트
└── MainPage/                 # 메인 페이지
    ├── ui/                   # 메인 페이지 관련 UI 컴포넌트
    └── index.tsx             # 페이지 컴포넌트
```

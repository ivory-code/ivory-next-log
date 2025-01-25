## 📂 app/ 디렉토리

`app/` 디렉토리는 애플리케이션의 주요 라우팅 및 API 처리 로직을 포함합니다. Next.js의 App Router를 기반으로 설계되었으며, 페이지와 API 경로가 분리되어 관리됩니다.

---

### 디렉토리 구조

```plaintext
app/
├── api/                # API 엔드포인트 정의
│   ├── blog/           # 블로그 관련 API (라우트 관리)
│   │   └── route.ts    # 블로그 관련 API 라우트
│   ├── blogDashBoard/  # 블로그 대시보드 API
│   │   └── route.ts    # 대시보드 관련 API 라우트
│   ├── editProfile/    # 프로필 수정 API
│   │   └── route.ts    # 프로필 수정 관련 API 라우트
│   └── main/           # 메인 엔드포인트 정의
│       ├── addFavorite.ts    # 즐겨찾기 추가 API
│       ├── createBlog.ts     # 블로그 생성 API
│       ├── createComment.ts  # 댓글 생성 API
│       ├── createProfile.ts  # 프로필 생성 API
│       ├── deleteBlog.ts     # 블로그 삭제 API
│       ├── deleteComment.ts  # 댓글 삭제 API
│       ├── deleteFavorite.ts # 즐겨찾기 삭제 API
│       ├── editBlog.ts       # 블로그 수정 API
│       ├── editProfile.ts    # 프로필 수정 API
│       └── getFavorite.ts    # 즐겨찾기 조회 API
├── blog/              # 블로그 메인 페이지
│   └── page.tsx       # 블로그 목록 페이지 컴포넌트
├── blogCreate/        # 블로그 생성 페이지
│   └── page.tsx       # 블로그 작성 컴포넌트
├── blogDashBoard/     # 블로그 대시보드 페이지
│   └── page.tsx       # 대시보드 컴포넌트
├── blogDetail/        # 블로그 상세 페이지
│   └── [id]/page.tsx  # 특정 블로그의 상세 내용 컴포넌트
├── favorite/          # 즐겨찾기 페이지
│   └── page.tsx       # 즐겨찾기 컴포넌트
├── providers/         # 전역 Provider 설정
│   └── SessionProvider/
│       └── index.tsx  # 사용자 세션 관리 Provider
├── globals.css        # 글로벌 스타일 설정
├── layout.tsx         # 기본 레이아웃 컴포넌트
├── not-found.tsx      # 404 페이지 컴포넌트
└── page.tsx           # 메인 페이지 컴포넌트
```

## 📂 features/ 디렉토리

`features/` 디렉토리는 프로젝트 내에서 특정 기능별로 코드가 분리된 영역입니다. 각 기능은 독립적으로 설계되어 관련된 컴포넌트, 훅, 상태 관리(reducer) 등을 포함하고 있습니다.

### 설계 의도

- 기능 기반 분리: features/ 디렉토리는 기능 단위로 코드가 분리되어 유지보수와 확장이 용이합니다.
- 재사용 가능성: 대부분의 컴포넌트는 독립적으로 설계되어 프로젝트 내 다른 곳에서도 재사용할 수 있습니다.
- UI와 로직 분리: 각 기능별로 UI 컴포넌트, 상태 관리(reducer), 그리고 커스텀 훅을 분리하여 코드의 가독성과 테스트 용이성을 높였습니다.

---

### 디렉토리 구조

```plaintext
features/
├── auth/                           # 인증 관련 기능
│   └── components/
│       └── LoginForm/
│           └── index.tsx           # 로그인 폼 컴포넌트
├── blog/                           # 블로그 관련 기능
│   ├── components/                 # 블로그 UI 컴포넌트 모음
│   │   ├── BlogCard/
│   │   ├── BlogEdit/
│   │   ├── BlogEditModal/
│   │   ├── BlogList/
│   │   ├── ImageUploader/
│   │   ├── InputField/
│   │   └── MarkdownView/
│   ├── hooks/                      # 블로그 관련 커스텀 훅
│   │   ├── useBlogEdit.ts          # 블로그 수정 기능
│   │   └── useSanitizeMarkdown.ts  # 마크다운 데이터 처리
│   └── reducer/                    # 블로그 관련 상태 관리
├── comment/                        # 댓글 관련 기능
│   └── components/
│       └── CommentBox/
│           └── index.tsx           # 댓글 박스 컴포넌트
├── profile/                        # 프로필 관련 기능
│   ├── components/
│   │   └── EditProfileModal/
│   │       └── index.tsx           # 프로필 수정 모달 컴포넌트
│   ├── hooks/
│   │   └── useProfileEdit.ts       # 프로필 수정 관련 로직
│   └── reducer/
│       └── profileReducer.ts       # 프로필 상태 관리 로직
```

## 🔨 Custom Hooks

### 1. `useBlogEdit`

#### 개요

- 블로그 게시물을 생성/수정하는 로직을 관리하는 훅입니다.
- 이미지 업로드, 파일 검증, 에디터 내 이미지 삽입 등 블로그 편집 관련 기능을 포함합니다.

#### 주요 기능

- 블로그 데이터 상태 관리 (`formData`)
- 이미지 파일 검증 및 업로드
- 에디터에서 드래그 앤 드롭으로 이미지 추가
- 블로그 생성 및 수정 처리

#### 반환 값

- `formData`: 블로그 데이터 상태
- `setFormData`: 블로그 데이터를 업데이트하는 함수
- `handleMainImageChange`: 메인 이미지 변경 처리
- `handleImageDropInEditor`: 에디터 내 이미지 삽입
- `handleEdit`: 블로그 생성/수정 실행
- `message`: 실행 결과 메시지
- `dialogConfig`: 다이얼로그 상태 및 설정

---

### 2. `useSanitizeMarkdown`

#### 개요

- 마크다운 문자열을 HTML로 변환한 뒤 안전하게 정제하는 훅입니다.
- 100자 미리보기를 생성하고, 이미지 태그를 제거합니다.

#### 주요 기능

- 마크다운 문자열을 HTML로 변환 (`marked` 사용)
- DOMPurify를 활용한 HTML 정제 및 보안 처리
- 100자 미리보기 생성

#### 반환 값

- `sanitizedContent`: 정제된 미리보기 콘텐츠 (100자 이내)

---

### 3. `useProfileEdit`

#### 개요

- 사용자 프로필 생성/수정을 관리하는 훅입니다.
- 이미지 업로드, 파일 검증, 프로필 데이터 상태 관리 등을 포함합니다.

#### 주요 기능

- 프로필 데이터 상태 관리 (`profileForm`)
- 이미지 파일 검증 및 업로드
- 프로필 생성 및 수정 API 호출
- 서버에서 프로필 데이터 가져오기

#### 반환 값

- `profileForm`: 프로필 데이터 상태
- `dialogConfig`: 다이얼로그 상태 및 설정
- `handleImageChange`: 프로필 이미지 변경 처리
- `saveProfile`: 프로필 저장 실행
- `fetchProfile`: 프로필 데이터 로드
- `handleFormChange`: 프로필 데이터 필드 업데이트
- `resetDialog`: 다이얼로그 상태 초기화

---

### 활용 예시

#### `useBlogEdit`

```tsx
const {formData, handleMainImageChange, handleEdit, message} =
  useBlogEdit(existingBlogData)

return (
  <BlogEditor
    title={formData.title}
    content={formData.content}
    onImageChange={handleMainImageChange}
    onSave={handleEdit}
  />
)
```

#### `useSanitizeMarkdown`

```tsx
const previewContent = useSanitizeMarkdown(markdown)

return <div dangerouslySetInnerHTML={{__html: previewContent}} />
```

#### `useProfileEdit`

```tsx
const {profileForm, handleImageChange, saveProfile, handleFormChange} =
  useProfileEdit()

return (
  <ProfileForm
    profile={profileForm}
    onImageChange={handleImageChange}
    onSave={saveProfile}
    onFieldChange={handleFormChange}
  />
)
```

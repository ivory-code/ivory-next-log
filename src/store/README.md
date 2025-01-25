## 📦 store/ 디렉토리

`store/` 디렉토리는 애플리케이션의 전역 상태 관리를 담당합니다. 이 디렉토리에는 `Zustand`를 기반으로 한 상태 관리 로직이 포함되어 있습니다.

### 설계 의도

- Zustand 활용: 가볍고 효율적인 전역 상태 관리를 위해 Zustand를 사용합니다.
- 전역 사용자 관리: 사용자 로그인 상태, 정보 등을 전역적으로 유지하여 어디서든 접근 및 수정 가능하게 설계되었습니다.
- 유지보수성: 상태와 관련된 로직을 명확히 분리하여 가독성과 확장성을 높였습니다.

---

### 주요 파일 구조

```plaintext
store/
├── user.ts         # 사용자 상태 관리
```

## `user.ts`

`user.ts`는 애플리케이션의 사용자 정보를 관리하는 전역 상태 파일입니다. `Zustand`를 기반으로 작성되었으며, 사용자 데이터와 관련된 상태와 메서드를 제공합니다.

---

### 주요 역할

- 사용자 로그인 상태 및 정보를 관리합니다.
- 사용자 데이터를 전역적으로 공유 및 수정할 수 있도록 지원합니다.

---

### 상태 구조

#### 1. `User` 인터페이스

사용자 데이터를 정의합니다:

- `created_at`: 계정 생성 시각.
- `email`: 사용자 이메일.
- `id`: 사용자 고유 ID.
- `role`: 사용자 역할 (예: `admin`, `user`).
- `nickname`: 사용자 닉네임.

#### 2. `UserState` 인터페이스

Zustand 상태와 메서드를 정의합니다:

- `user`: 현재 사용자 정보 (`User | null`).
- `setUser(user: User | null)`: 사용자 상태를 업데이트하는 메서드.

---

### 기본 사용법

```tsx
import {useUser} from '@/store/user'

const UserInfo = () => {
  const {user, setUser} = useUser()

  return (
    <div>
      {user ? <p>Welcome, {user.nickname}!</p> : <p>No user logged in.</p>}
      <button onClick={() => setUser(null)}>Log Out</button>
    </div>
  )
}
```

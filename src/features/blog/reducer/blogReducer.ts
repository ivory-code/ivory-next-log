interface State {
  isVisible: boolean
  isError: boolean
  message: string
}

// 초기 상태 정의
export const blogInitialState: State = {
  isVisible: false,
  isError: false,
  message: '',
}

// Dialog 리듀서 정의
export const blogReducer = (state: State, action: Partial<State>): State => ({
  ...state,
  ...action,
})

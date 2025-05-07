import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: {
    userId: number;
    username: string;
    randomNickname: string;
  } | null;
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // 인증 정보를 저장
    setAuth(_state, action: PayloadAction<AuthState>) {
      return action.payload;
    },
    // 초기 상태로 리셋
    clearAuth() {
      return initialState;
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;

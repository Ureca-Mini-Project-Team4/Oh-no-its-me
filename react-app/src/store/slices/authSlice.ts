import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: {
    userId: number;
    voted: boolean;
  } | null;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // 인증 정보를 저장
    setAuth(state, action: PayloadAction<AuthState>) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    // 초기 상태로 리셋
    clearAuth(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;

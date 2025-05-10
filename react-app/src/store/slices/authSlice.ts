import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserInfoResponse } from '@/apis/user/getUserInfo';

interface AuthState {
  user: UserInfoResponse | null;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<{ user: UserInfoResponse }>) {
      state.user = action.payload.user;
    },
    // 초기 상태로 리셋
    clearAuth(state) {
      state.user = null;
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;

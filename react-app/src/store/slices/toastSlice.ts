import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ToastType = 'success' | 'warning' | 'information';

interface ToastState {
  isShow: boolean;
  message: string;
  type: ToastType;
}

const initialState: ToastState = {
  isShow: false,
  message: '',
  type: 'success',
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    show(state, action: PayloadAction<{ message: string; type: ToastType }>) {
      state.isShow = true;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    hide(state) {
      state.isShow = false;
    },
  },
});

export const { show, hide } = toastSlice.actions;
export default toastSlice.reducer;

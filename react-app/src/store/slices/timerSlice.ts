import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

interface TimerState {
  isAvailable: boolean;
  lastResetDate: string | null;
}

const initialState: TimerState = {
  isAvailable: false,
  lastResetDate: null,
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    updateAvailability(state) {
      const hour = dayjs().hour();
      state.isAvailable = hour >= 11 && hour < 14;
    },
    resetTimer(state) {
      state.lastResetDate = dayjs().format('YYYY-MM-DD');
    },
  },
});

export const { updateAvailability, resetTimer } = timerSlice.actions;
export default timerSlice.reducer;

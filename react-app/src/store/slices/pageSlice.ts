import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PageState {
  currentPage: 1 | 2 | 3 | 4;
}

const initialState: PageState = {
  currentPage: 1,
};

const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<1 | 2 | 3 | 4>) {
      state.currentPage = action.payload;
    },
  },
});

export const { setPage } = pageSlice.actions;
export default pageSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { setTheme } from './middlewares';

const initialState = {
  currentTheme: 'dark',
  error: null,
  isLoading: false,
  success: null,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setTheme.pending, (state) => {
      state.isLoading = true;
      state.success = null;
      state.error = '';
    });
    builder.addCase(setTheme.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true;
      state.error = '';
      state.currentTheme = action.payload;
    });
    builder.addCase(setTheme.rejected, (state, action) => {
      state.isLoading = false;
      state.success = false;
      state.error = action.payload;
    });
  },
});

export const themeActions = themeSlice.actions;
export const themeReducer = themeSlice.reducer;

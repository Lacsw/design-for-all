// src/store/slices/catalog/slice.js
import { createSlice } from '@reduxjs/toolkit';

const catalogSlice = createSlice({
  name: 'catalog',
  initialState: {
    currentCategory: '',

  },
  reducers: {
    setCurrentCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
  },
});

export const { setCurrentCategory } =
  catalogSlice.actions;

// Селекторы
export const selectCurrentCategory = (state) => state.catalog.currentCategory;

export const catalogReducer = catalogSlice.reducer;

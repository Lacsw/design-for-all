// src/store/slices/catalog/slice.js
import { createSlice } from '@reduxjs/toolkit';

const catalogSlice = createSlice({
  name: 'catalog',
  initialState: {
    currentCategory: '',
    currentSubCategory: '',

  },
  reducers: {
    setCurrentCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
    setCurrentSubCategory: (state, action) => {
      state.currentSubCategory = action.payload;
    },
  },
});

export const { setCurrentCategory   , setCurrentSubCategory} =
  catalogSlice.actions;

// Селекторы
export const selectCurrentCategory = (state) => state.catalog.currentCategory;
export const selectCurrentSubCategory = (state) => state.catalog.currentSubCategory;

export const catalogReducer = catalogSlice.reducer;

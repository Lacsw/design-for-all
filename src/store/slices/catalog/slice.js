// src/store/slices/catalog/slice.js
import { createSlice } from '@reduxjs/toolkit';

const catalogSlice = createSlice({
  name: 'catalog',
  initialState: {
    currentSection: '',
    currentCategory: '',
    isOpen: false,
    shouldRemountTree: false,
  },
  reducers: {
    setCurrentSection: (state, action) => {
      state.currentSection = action.payload;
    },
    setCurrentCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
    setTreeData: (state, action) => {
      state.treeData = action.payload;
    },
    setIsOpen: (state, action) => {
      state.isOpen = action.payload;
    },
    setShouldRemountTree: (state, action) => {
      state.shouldRemountTree = action.payload;
    },
  },
});

export const {
  setCurrentSection,
  setCurrentCategory,
  setIsOpen,
  setShouldRemountTree,
} = catalogSlice.actions;

// Селекторы
export const selectCurrentSection = (state) => state.catalog.currentSection;
export const selectCurrentCategory = (state) => state.catalog.currentCategory;
export const selectCurrentHash = (state) => state.catalog.currentHash;
export const selectIsOpen = (state) => state.catalog.isOpen;
export const selectShouldRemountTree = (state) =>
  state.catalog.shouldRemountTree;

// Алиас для обратной совместимости
export const selectMainCategory = selectCurrentCategory;
export const setMainCategory = setCurrentCategory;

export const catalogReducer = catalogSlice.reducer;

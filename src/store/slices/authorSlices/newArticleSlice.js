import { createSlice } from '@reduxjs/toolkit';
import { uploadMainImageThunk } from 'store/middlewares/author';

const initialState = {
  mainImage: null,
  isLoading: false,
  success: null,
  error: null,
};

const newArticleSlice = createSlice({
  name: 'newArticle',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(uploadMainImageThunk.pending, (state) => {
      state.success = null;
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(uploadMainImageThunk.fulfilled, (state, action) => {
      state.mainImage = action.payload;
      state.success = true;
      state.isLoading = false;
    });
    builder.addCase(uploadMainImageThunk.rejected, (state, action) => {
      state.success = false;
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

// export const {} = newArticleSlice.actions;

export default newArticleSlice.reducer;

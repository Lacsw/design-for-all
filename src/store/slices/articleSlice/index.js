import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import createTree from 'utils/helpers/createTree';
import { getTree } from 'utils/api/tree';
import authorApi from 'utils/api/author';

export const initialState = {
  catalog: null,
  article: null,
  loading: true,
  error: ''
};

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {},
  selectors: {
    selectCatalog: state => state.catalog,
    selectArticle: state => state.article,
    selectError: state => state.error,
    selectLoading: state => state.loading
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTree.fulfilled, (state, action) => {
        state.catalog = createTree(action.payload);
      })
      .addCase(fetchArticle.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchArticle.rejected, (state) => {
        state.loading = false;
        state.error = 'Не удалось загрузить данные';
      })
      .addCase(fetchArticle.fulfilled, (state, action) => {
        state.article = action.payload;
        state.loading = false;
        state.error = '';
      });
  }
});

export const fetchTree = createAsyncThunk(
  'tree/get', async (options) => getTree(options)
);

export const fetchArticle = createAsyncThunk(
  'article/get', async (options) => authorApi.getArticleById(options)
);

export const {
  selectCatalog,
  selectArticle,
  selectError,
  selectLoading
} = articleSlice.selectors;

export default articleSlice.reducer;